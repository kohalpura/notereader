
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
    Note, UserRole, Theme, Language, View, Category, UNCATEGORIZED_CATEGORY_ID, TOCItem, 
    TextSize, TEXT_SIZE_MAP, PROSE_TEXT_SIZE_MAP, LocalizedString, AllTranslations,
    FooterSection, FooterSectionActionType
} from './types';
import { 
    INITIAL_NOTES, getTextSizeClass, PlusIcon, DEFAULT_ABOUT_US_CONTENT_EN, DEFAULT_ABOUT_US_CONTENT_NE, 
    DEFAULT_UNCATEGORIZED_CATEGORY_NAME, INITIAL_CATEGORIES, ArrowLeftIcon, ADMIN_USERNAME, INITIAL_ADMIN_PASSWORD,
    EditIcon, DeleteIcon, ImportIcon, EyeIcon, getLocalizedText, PdfFileIcon, PlayStoreIcon, ExternalLinkIcon, DocumentTextIcon, InfoIcon,
    VisibilityIcon, VisibilityOffIcon
} from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import NoteViewer from './components/NoteViewer';
import FilterControls from './components/FilterControls';
import Drawer from './components/Drawer';
import LoginModal from './components/LoginModal';
import AboutUsPage from './components/AboutUsPage';
import CategoryCard from './components/admin/CategoryCard';
import CategoryEditor from './components/admin/CategoryEditor';
import AdminSettingsModal from './components/admin/AdminSettingsModal';
import AdminTranslationsEditor from './components/admin/AdminTranslationsEditor';
import AdminFooterSections from './components/admin/AdminFooterSections'; // New Import
import FooterSectionEditor from './components/admin/FooterSectionEditor'; // New Import
import FooterSectionViewerModal from './components/FooterSectionViewerModal'; // New Import
import TableOfContents from './components/FloatingTOC'; 
import BackToTopButton from './components/BackToTopButton';
import translationsData from './translations';


// Declare mammoth globally
declare global {
  interface Window {
    mammoth?: any;
  }
}

// Helper to generate a simple slug-like ID from the English name
const generateIdFromName = (englishName: string) => englishName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const NEW_APP_ICON_URL = "https://img.freepik.com/premium-vector/law-attorney-logo-design_80251441-161.jpg";
const DEFAULT_PLAY_STORE_ICON_URL = "https://www.citypng.com/public/uploads/preview/hd-google-play-playstore-logo-symbol-png-701751694777134cuw3jc7voo.png";

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', INITIAL_NOTES);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', []);
  const [footerSections, setFooterSections] = useLocalStorage<FooterSection[]>('footerSections', []); // New state for footer sections
  
  const [userRole, setUserRole] = useLocalStorage<UserRole>('userRole', UserRole.READER);
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Theme.LIGHT);
  const [textSizeValue, setTextSizeValue] = useLocalStorage<string>('textSizeValue', '2'); 
  const [isReadingModeEnabled, setReadingModeEnabled] = useLocalStorage<boolean>('isReadingModeEnabled', false);

  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');
  const [appCustomTranslations, setAppCustomTranslations] = useLocalStorage<AllTranslations>('appCustomTranslations', translationsData);

  const currentTextSize = useMemo(() => getTextSizeClass(textSizeValue), [textSizeValue]);

  const currentProseClass = useMemo(() => {
    const currentSelectedTextSizeEnum = TEXT_SIZE_MAP[textSizeValue];
    if (currentSelectedTextSizeEnum && PROSE_TEXT_SIZE_MAP[currentSelectedTextSizeEnum]) {
      return PROSE_TEXT_SIZE_MAP[currentSelectedTextSizeEnum];
    }
    return 'prose'; 
  }, [textSizeValue]);


  const [aboutUsContent, setAboutUsContent] = useLocalStorage<Record<Language, string>>('aboutUsContent', {
    en: DEFAULT_ABOUT_US_CONTENT_EN,
    ne: DEFAULT_ABOUT_US_CONTENT_NE,
  });
  const [appIconUrl, setAppIconUrl] = useLocalStorage<string | null>('appIconUrl', NEW_APP_ICON_URL);
  const [customPlayStoreIconUrl, setCustomPlayStoreIconUrl] = useLocalStorage<string | null>('customPlayStoreIconUrl', null);
  const [adminPassword, setAdminPassword] = useLocalStorage<string>('adminPassword', INITIAL_ADMIN_PASSWORD);


  // UI State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('NOTES_LIST');
  const [showGlobalSearch, setShowGlobalSearch] = useState<boolean>(false);
  const [showAdminSettingsModal, setShowAdminSettingsModal] = useState<boolean>(false);
  const [isTocPanelOpen, setIsTocPanelOpen] = useState(false);
  const [activeTocItems, setActiveTocItems] = useState<TOCItem[]>([]);
  const [previousAdminViewBeforeNoteView, setPreviousAdminViewBeforeNoteView] = useState<View | null>(null);


  // Admin state for category and note management
  const [selectedAdminCategoryId, setSelectedAdminCategoryId] = useState<string | null>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [tempAboutUsEdit, setTempAboutUsEdit] = useState<Record<Language, string>>({ en: '', ne: '' });

  // Admin state for footer section management
  const [showFooterSectionEditor, setShowFooterSectionEditor] = useState<boolean>(false);
  const [editingFooterSection, setEditingFooterSection] = useState<FooterSection | null>(null);
  const [showFooterSectionViewerModal, setShowFooterSectionViewerModal] = useState<boolean>(false);
  const [selectedFooterSectionForModal, setSelectedFooterSectionForModal] = useState<FooterSection | null>(null);


  // Reader state
  const [selectedNoteForView, setSelectedNoteForView] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReaderCategory, setSelectedReaderCategory] = useState<string>(''); 
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    // Ensure 'Uncategorized' category always exists and is first (or with a fixed, known structure)
    const uncategorizedExists = categories.some(c => c.id === UNCATEGORIZED_CATEGORY_ID);
    if (!uncategorizedExists) {
      setCategories(prev => [{ id: UNCATEGORIZED_CATEGORY_ID, name: DEFAULT_UNCATEGORIZED_CATEGORY_NAME, isDeletable: false }, ...prev]);
    }

    if (categories.length <= 1 && notes.length > 0) { 
        const derivedCategoriesFromNotes: Category[] = categories.filter(c => c.id === UNCATEGORIZED_CATEGORY_ID); 
        
        const noteCategoryEnglishNames = Array.from(new Set(INITIAL_NOTES.map(note => note.category))); 
        
        noteCategoryEnglishNames.forEach(enName => {
            const id = generateIdFromName(enName);
            if (id !== UNCATEGORIZED_CATEGORY_ID && !derivedCategoriesFromNotes.find(c => c.id === id)) {
                derivedCategoriesFromNotes.push({ 
                    id, 
                    name: { en: enName, ne: `नेपाली ${enName}` }, 
                    isDeletable: true 
                });
            }
        });
        
        setCategories(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const newCatsToAdd = derivedCategoriesFromNotes.filter(dc => !existingIds.has(dc.id));
            return [...prev, ...newCatsToAdd];
        });

        setNotes(prevNotes => prevNotes.map(n => {
            let catId = UNCATEGORIZED_CATEGORY_ID;
            if (typeof n.category === 'string') {
                 catId = generateIdFromName(n.category) || UNCATEGORIZED_CATEGORY_ID;
            } else { 
                catId = n.category;
            }
            
            const title = typeof n.title === 'string' ? { en: n.title, ne: `नेपाली ${n.title}` } : n.title;
            const content = typeof n.content === 'string' ? { en: n.content, ne: `नेपाली सामग्री` } : n.content;

            return {...n, category: catId, title, content };
        }));
    }
  }, []); 


  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const currentLangCustomTranslations = appCustomTranslations[language] || {};
    const fallbackLangCustomTranslations = appCustomTranslations.en || {};
    
    const currentLangDefaultTranslations = translationsData[language] || {};
    const fallbackLangDefaultTranslations = translationsData.en || {};

    let translation = currentLangCustomTranslations[key] || 
                      fallbackLangCustomTranslations[key] ||
                      currentLangDefaultTranslations[key] ||
                      fallbackLangDefaultTranslations[key] ||
                      key;

    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    return translation;
  }, [language, appCustomTranslations]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  useEffect(() => {
    if (isReadingModeEnabled) {
      document.documentElement.classList.add('reading-mode-active');
    } else {
      document.documentElement.classList.remove('reading-mode-active');
    }
  }, [isReadingModeEnabled]);
  
  useEffect(() => {
    if (currentView === 'ADMIN_EDIT_ABOUT') {
      setTempAboutUsEdit(aboutUsContent); // Load both en and ne for editing
    }
  }, [currentView, aboutUsContent]); // Removed language dependency as we load both

  useEffect(() => {
    setSelectedNoteForView(null);
    setShowNoteEditor(false);
    setEditingNote(null);
    setShowGlobalSearch(false);
    setActiveTocItems([]); 
    setIsTocPanelOpen(false);
    setPreviousAdminViewBeforeNoteView(null); 
    setShowFooterSectionEditor(false);
    setEditingFooterSection(null);
    setShowFooterSectionViewerModal(false);
    setSelectedFooterSectionForModal(null);
    
    if (userRole === UserRole.ADMIN) {
      const nonCategoryAdminViews: View[] = ['ADMIN_EDIT_ABOUT', 'ADMIN_SETTINGS', 'ADMIN_CATEGORY_NOTES_VIEW', 'NOTE_VIEWER', 'ADMIN_TRANSLATIONS_EDIT', 'ADMIN_FOOTER_SECTIONS_VIEW'];
      if (!nonCategoryAdminViews.includes(currentView)) {
         setCurrentView('ADMIN_CATEGORIES_VIEW');
      }
    } else { 
        if (currentView !== 'ABOUT_US' && currentView !== 'NOTE_VIEWER') {
            setCurrentView('NOTES_LIST');
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]); // currentView removed to prevent loop with ADMIN_TRANSLATIONS_EDIT and ADMIN_FOOTER_SECTIONS_VIEW

  useEffect(() => {
    if (!selectedNoteForView || selectedNoteForView.pdfUrl) { // Also hide TOC if it's a PDF note
      setActiveTocItems([]);
      setIsTocPanelOpen(false);
    }
  }, [selectedNoteForView]);


  const ensureCategoryExists = useCallback((categoryId: string, categoryLocalizedName?: LocalizedString): Category => {
    const existingCategory = categories.find(c => c.id === categoryId);
    if (existingCategory) return existingCategory;

    const nameToUse = categoryLocalizedName || { en: categoryId, ne: categoryId }; 
    const newCategory: Category = {
      id: categoryId, 
      name: nameToUse,
      isDeletable: categoryId !== UNCATEGORIZED_CATEGORY_ID,
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, [categories, setCategories]);
  

  const addNote = useCallback((note: Note) => {
    setNotes(prevNotes => [note, ...prevNotes]);
  }, [setNotes]);

  const updateNote = useCallback((updatedNote: Note) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
  }, [setNotes]);

  const deleteNote = useCallback((noteId: string) => {
    const noteToDelete = notes.find(n => n.id === noteId);
    if (window.confirm(t('confirmDeleteNote') + `\n"${getLocalizedText(noteToDelete?.title, language)}"`)) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    }
  }, [setNotes, t, language, notes]);

  const toggleBookmark = useCallback((noteId: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, isBookmarked: !note.isBookmarked } : note
      )
    );
  }, [setNotes]);

  const incrementViewCount = useCallback((noteId: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId ? { ...note, views: (note.views || 0) + 1 } : note
      )
    );
  }, [setNotes]);

  const handleSaveNote = (noteToSave: Note, newCategoryLocalizedName?: LocalizedString) => {
    let finalNote = { ...noteToSave };

    if (newCategoryLocalizedName) { 
      const newCatId = generateIdFromName(newCategoryLocalizedName.en);
      const conflictingCategory = categories.find(c => 
        c.id === newCatId || 
        c.name.en.toLowerCase() === newCategoryLocalizedName.en.toLowerCase() ||
        (newCategoryLocalizedName.ne && c.name.ne?.toLowerCase() === newCategoryLocalizedName.ne.toLowerCase())
      );

      if (conflictingCategory) {
        alert(t('categoryNameExists'));
        return; 
      }
      ensureCategoryExists(newCatId, newCategoryLocalizedName);
      finalNote.category = newCatId; 
    } else {
      const categoryExists = categories.some(c => c.id === finalNote.category);
      if (!categoryExists) { 
        finalNote.category = UNCATEGORIZED_CATEGORY_ID;
      }
      ensureCategoryExists(finalNote.category, categories.find(c => c.id === finalNote.category)?.name); 
    }

    if (editingNote) {
      updateNote(finalNote);
    } else {
      addNote(finalNote);
    }
    setShowNoteEditor(false);
    setEditingNote(null);
  };
  
  const handleSaveCategory = (categoryToSave: Category) => { 
    const newId = generateIdFromName(categoryToSave.name.en);
    
    const newEnNameLower = categoryToSave.name.en.toLowerCase();
    const newNeNameLower = categoryToSave.name.ne?.toLowerCase();

    const conflictingCategory = categories.find(c => {
        if (editingCategory && c.id === editingCategory.id) return false; 
        
        if (c.id === newId) return true; 
        if (c.name.en.toLowerCase() === newEnNameLower) return true; 
        if (newNeNameLower && c.name.ne && c.name.ne.toLowerCase() === newNeNameLower) return true; 
        return false;
    });

    if (conflictingCategory) {
      alert(t('categoryNameExists'));
      return;
    }
    
    if (editingCategory) { 
      const updatedCategory = {...categoryToSave, id: newId, isDeletable: editingCategory.isDeletable }; 
      setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? updatedCategory : cat));
      if (editingCategory.id !== newId) { 
         setNotes(prevNotes => prevNotes.map(note => note.category === editingCategory.id ? {...note, category: newId} : note));
      }
      alert(t('categoryUpdated'));
    } else { 
      setCategories(prev => [...prev, {...categoryToSave, id: newId, isDeletable: true}]);
      alert(t('categoryCreated'));
    }
    setShowCategoryEditor(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryIdToDelete: string) => {
    const categoryObjectToDelete = categories.find(c => c.id === categoryIdToDelete);
    if (!categoryObjectToDelete || categoryObjectToDelete.isDeletable === false) return;

    const localizedCatName = getLocalizedText(categoryObjectToDelete.name, language);
    if (window.confirm(t('confirmDeleteCategory', { categoryName: localizedCatName }))) {
      const uncategorized = ensureCategoryExists(UNCATEGORIZED_CATEGORY_ID, DEFAULT_UNCATEGORIZED_CATEGORY_NAME);
      
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.category === categoryIdToDelete ? { ...note, category: uncategorized.id } : note
        )
      );
      setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryIdToDelete));
      alert(t('categoryDeleted'));
      if(selectedAdminCategoryId === categoryIdToDelete) {
          setSelectedAdminCategoryId(null);
          setCurrentView('ADMIN_CATEGORIES_VIEW');
      }
    }
  };

  const handleSaveFooterSection = (sectionToSave: FooterSection) => {
    let updatedSections;
    if (editingFooterSection) {
      updatedSections = footerSections.map(s => s.id === sectionToSave.id ? sectionToSave : s);
    } else {
      const newSection = {
        ...sectionToSave,
        id: Date.now().toString() + Math.random().toString(36).substring(2,9),
        order: footerSections.length, // Initially add to the end
      };
      updatedSections = [...footerSections, newSection];
    }
    // Re-sort and re-index
    updatedSections.sort((a,b) => a.order - b.order);
    updatedSections = updatedSections.map((s, index) => ({ ...s, order: index }));

    setFooterSections(updatedSections);
    setShowFooterSectionEditor(false);
    setEditingFooterSection(null);
    alert(t('footerSectionSavedSuccess'));
  };

  const handleDeleteFooterSection = (sectionId: string) => {
    const sectionToDelete = footerSections.find(s => s.id === sectionId);
    if (sectionToDelete && window.confirm(t('confirmDeleteFooterSection', { sectionTitle: getLocalizedText(sectionToDelete.title, language) }))) {
      let updatedSections = footerSections.filter(s => s.id !== sectionId);
      // Re-sort and re-index after deletion
      updatedSections.sort((a,b) => a.order - b.order);
      updatedSections = updatedSections.map((s, index) => ({ ...s, order: index }));
      setFooterSections(updatedSections);
      alert(t('footerSectionDeletedSuccess'));
    }
  };

  const handleToggleFooterSectionVisibility = (sectionId: string) => {
    setFooterSections(prev => prev.map(s => s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s));
  };

  const handleReorderFooterSection = (sectionId: string, direction: 'up' | 'down') => {
    const sectionsCopy = [...footerSections].sort((a, b) => a.order - b.order);
    const currentIndex = sectionsCopy.findIndex(s => s.id === sectionId);

    if (currentIndex === -1) return;

    if (direction === 'up' && currentIndex > 0) {
      // Swap order with the previous item
      const tempOrder = sectionsCopy[currentIndex].order;
      sectionsCopy[currentIndex].order = sectionsCopy[currentIndex - 1].order;
      sectionsCopy[currentIndex - 1].order = tempOrder;
    } else if (direction === 'down' && currentIndex < sectionsCopy.length - 1) {
      // Swap order with the next item
      const tempOrder = sectionsCopy[currentIndex].order;
      sectionsCopy[currentIndex].order = sectionsCopy[currentIndex + 1].order;
      sectionsCopy[currentIndex + 1].order = tempOrder;
    }

    // Re-sort by the potentially swapped order values and then re-index
    let reIndexedSections = sectionsCopy
      .sort((a, b) => a.order - b.order)
      .map((section, index) => ({ ...section, order: index }));
    
    setFooterSections(reIndexedSections);
  };

  const handleViewFooterSectionContent = (section: FooterSection) => {
    setSelectedFooterSectionForModal(section);
    setShowFooterSectionViewerModal(true);
  };


  const handleEditNote = (noteToEdit: Note) => {
    setEditingNote(noteToEdit);
    setShowNoteEditor(true);
    setIsDrawerOpen(false);
  };

  const handleViewNoteReader = (noteToView: Note) => {
    setSelectedNoteForView(noteToView);
    incrementViewCount(noteToView.id);
    setCurrentView('NOTE_VIEWER');
    setIsDrawerOpen(false);
    setShowGlobalSearch(false);
    if (noteToView.pdfUrl) { // If it's a PDF, ensure TOC is cleared
        setActiveTocItems([]);
        setIsTocPanelOpen(false);
    }
  };

  const handleAdminPreviewNote = (noteToPreview: Note) => {
    setPreviousAdminViewBeforeNoteView(currentView); 
    handleViewNoteReader(noteToPreview);
  };
  
  const handleCloseNoteViewer = () => {
    setSelectedNoteForView(null);
    setActiveTocItems([]);
    setIsTocPanelOpen(false);
    if (userRole === UserRole.ADMIN && previousAdminViewBeforeNoteView) {
      setCurrentView(previousAdminViewBeforeNoteView);
      setPreviousAdminViewBeforeNoteView(null); 
    } else {
      setCurrentView('NOTES_LIST');
    }
  };
  
  const handleLogout = () => {
    setUserRole(UserRole.READER);
    setCurrentView('NOTES_LIST'); 
    setSelectedAdminCategoryId(null);
    setIsDrawerOpen(false);
  };

  const handleSaveAboutUs = () => {
    setAboutUsContent(tempAboutUsEdit); // tempAboutUsEdit is now {en, ne}
    setCurrentView(userRole === UserRole.ADMIN ? 'ADMIN_CATEGORIES_VIEW' : 'NOTES_LIST');
    alert(t('aboutUsUpdated'));
  };

  const navigateToAboutUs = () => {
    setCurrentView('ABOUT_US');
    setSelectedNoteForView(null); 
    setIsDrawerOpen(false);
    setShowGlobalSearch(false);
  };
  
  const navigateToAdminEditAboutUs = () => {
    setTempAboutUsEdit(aboutUsContent); 
    setCurrentView('ADMIN_EDIT_ABOUT');
    setIsDrawerOpen(false);
  };
  
  const navigateToAdminSettings = () => {
    setCurrentView('ADMIN_SETTINGS');
    setShowAdminSettingsModal(true);
    setIsDrawerOpen(false);
  };
  
  const navigateToAdminEditText = () => {
    setCurrentView('ADMIN_TRANSLATIONS_EDIT');
    setIsDrawerOpen(false);
  };

  const navigateToAdminManageFooter = () => {
    setCurrentView('ADMIN_FOOTER_SECTIONS_VIEW');
    setIsDrawerOpen(false);
  };

  const handlePasswordChange = async (currentPass: string, newPass: string): Promise<boolean> => {
    if (currentPass === adminPassword) {
      setAdminPassword(newPass);
      return true;
    }
    return false;
  };

  const handleSelectAdminCategory = (categoryId: string) => {
    setSelectedAdminCategoryId(categoryId);
    setCurrentView('ADMIN_CATEGORY_NOTES_VIEW');
  };

  const handleBackToCategoriesView = () => {
    setSelectedAdminCategoryId(null);
    setCurrentView('ADMIN_CATEGORIES_VIEW');
  };
  
  const readerCategories = useMemo(() => {
    const noteCategoryIds = new Set(notes.map(note => note.category));
    return categories.filter(cat => 
        noteCategoryIds.has(cat.id) || 
        (cat.id === UNCATEGORIZED_CATEGORY_ID && notes.some(n => n.category === UNCATEGORIZED_CATEGORY_ID)) ||
        (cat.id === UNCATEGORIZED_CATEGORY_ID && categories.length === 1)
    );
  }, [notes, categories]);


  const filteredReaderNotes = useMemo(() => {
    return notes
      .filter(note => {
        if (showBookmarksOnly && !note.isBookmarked) return false;
        if (selectedReaderCategory && note.category !== selectedReaderCategory) return false;
        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          const categoryOfNote = categories.find(c => c.id === note.category);
          
          const titleEn = note.title.en.toLowerCase();
          const titleNe = note.title.ne?.toLowerCase() || '';
          const contentEn = note.content.en.toLowerCase();
          const contentNe = note.content.ne?.toLowerCase() || '';
          const categoryNameEn = categoryOfNote ? categoryOfNote.name.en.toLowerCase() : '';
          const categoryNameNe = categoryOfNote && categoryOfNote.name.ne ? categoryOfNote.name.ne.toLowerCase() : '';
          const pdfFileName = note.pdfFileName?.toLowerCase() || '';
          
          const searchFields = [
            titleEn, titleNe,
            contentEn, contentNe, 
            categoryNameEn, categoryNameNe,
            pdfFileName,
            ...note.tags.map(t => t.toLowerCase())
          ];
          return searchFields.some(field => field.includes(lowerSearchTerm));
        }
        return true;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes, searchTerm, selectedReaderCategory, showBookmarksOnly, categories, language]);

  const totalNotes = notes.length;
  const totalViews = useMemo(() => notes.reduce((sum, note) => sum + (note.views || 0), 0), [notes]);
  const popularNotes = useMemo(() => 
    [...notes]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3), 
  [notes]);

  const handleGlobalSearchSubmit = (term: string) => {
    setSearchTerm(term);
    if (userRole === UserRole.READER) {
      setCurrentView('NOTES_LIST');
      setSelectedNoteForView(null);
    } 
  };

  const handleImportFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && window.mammoth) {
      alert(t('importingNote'));
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const { value: html } = await window.mammoth.convertToHtml({ arrayBuffer });
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          
          let noteTitleEn = file.name.replace(/\.docx$/i, ''); 
          const h1 = tempDiv.querySelector('h1');
          if (h1) {
            noteTitleEn = h1.textContent || noteTitleEn;
            h1.remove(); 
          }

          const headings = tempDiv.querySelectorAll('h2, h3, h4, h5, h6');
          headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1), 10);
            const prefix = '#'.repeat(level);
            const markdownHeading = document.createElement('p'); 
            markdownHeading.textContent = `${prefix} ${heading.textContent}`;
            heading.parentNode?.replaceChild(markdownHeading, heading);
          });
          
          const contentEn = tempDiv.innerText || tempDiv.textContent || ''; 
          
          const newNote: Note = {
            id: Date.now().toString() + Math.random().toString(36).substring(2,9),
            title: { en: noteTitleEn, ne: '' }, 
            content: { en: contentEn.trim(), ne: '' }, 
            category: selectedAdminCategoryId || UNCATEGORIZED_CATEGORY_ID, 
            tags: ['imported'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isBookmarked: false,
            views: 0,
          };
          handleSaveNote(newNote); 
          alert(t('noteImportedSuccess'));
        } catch (err) {
          console.error("Error importing .docx: ", err);
          alert(t('importFailed'));
        }
      };
      reader.readAsArrayBuffer(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const renderAdminContent = () => {
    if (currentView === 'ADMIN_EDIT_ABOUT') {
       return (
        <div className="animate-fadeIn p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('editAboutUs')}</h2>
          
          <div className="mb-4">
            <label htmlFor="aboutUsEn" className="block text-sm font-medium text-textcol-light dark:text-textcol-dark mb-1">
              {t('aboutUsContentEnLabel')}
            </label>
            <textarea
              id="aboutUsEn"
              value={tempAboutUsEdit.en}
              onChange={(e) => setTempAboutUsEdit(prev => ({...prev, en: e.target.value}))}
              rows={10}
              className="w-full p-2 border border-bordercol-light dark:border-bordercol-dark rounded-md bg-background-light dark:bg-gray-700 focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="aboutUsNe" className="block text-sm font-medium text-textcol-light dark:text-textcol-dark mb-1">
              {t('aboutUsContentNeLabel')}
            </label>
            <textarea
              id="aboutUsNe"
              value={tempAboutUsEdit.ne}
              onChange={(e) => setTempAboutUsEdit(prev => ({...prev, ne: e.target.value}))}
              rows={10}
              className="w-full p-2 border border-bordercol-light dark:border-bordercol-dark rounded-md bg-background-light dark:bg-gray-700 focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark"
            />
          </div>

          <div className="mt-4 flex space-x-2">
            <button onClick={handleSaveAboutUs} className="px-4 py-2 bg-primary-DEFAULT hover:bg-primary-hover text-white rounded-md">{t('saveChanges')}</button>
            <button onClick={() => setCurrentView('ADMIN_CATEGORIES_VIEW')} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md">{t('cancel')}</button>
          </div>
        </div>
      );
    }
    if (currentView === 'ADMIN_TRANSLATIONS_EDIT') {
      return (
        <AdminTranslationsEditor
          currentCustomTranslations={appCustomTranslations}
          defaultTranslations={translationsData}
          onSaveTranslations={setAppCustomTranslations}
          onResetAllToDefaults={() => setAppCustomTranslations(translationsData)}
          t={t}
          onBack={handleBackToCategoriesView}
        />
      );
    }
    if (currentView === 'ADMIN_FOOTER_SECTIONS_VIEW') {
      return (
        <AdminFooterSections
          footerSections={footerSections}
          onAdd={() => { setEditingFooterSection(null); setShowFooterSectionEditor(true); }}
          onEdit={(section) => { setEditingFooterSection(section); setShowFooterSectionEditor(true); }}
          onDelete={handleDeleteFooterSection}
          onToggleVisibility={handleToggleFooterSectionVisibility}
          onReorder={handleReorderFooterSection}
          t={t}
          currentLanguage={language}
          onBack={handleBackToCategoriesView}
        />
      );
    }


    const currentSelectedCategoryObj = categories.find(c => c.id === selectedAdminCategoryId);
    const currentSelectedCategoryName = currentSelectedCategoryObj ? getLocalizedText(currentSelectedCategoryObj.name, language) : "";


    return (
      <div className="animate-fadeIn">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {currentView === 'ADMIN_CATEGORY_NOTES_VIEW' && currentSelectedCategoryName
                    ? t('notesInCategory') + `: ${currentSelectedCategoryName}`
                    : t('adminPanel')}
            </h2>
            <div className="flex items-center space-x-2">
                {currentView === 'ADMIN_CATEGORY_NOTES_VIEW' && (
                    <button
                    onClick={handleBackToCategoriesView}
                    className="flex items-center px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
                    >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    {t('backToCategories')}
                    </button>
                )}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md shadow"
                    title={t('importNoteWord')}
                >
                    <ImportIcon className="w-4 h-4 mr-2" /> {t('importNoteWord')}
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImportFileSelect} accept=".docx" className="hidden" />
            </div>
        </div>

        {currentView === 'ADMIN_CATEGORIES_VIEW' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('totalNotes')}</h3>
                <p className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-dark">{totalNotes}</p>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('totalViews')}</h3>
                <p className="text-3xl font-bold text-primary-DEFAULT dark:text-primary-dark">{totalViews}</p>
              </div>
              <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{t('mostPopular')}</h3>
                {popularNotes.length > 0 ? (
                  <ul className="text-sm list-disc list-inside pl-1 text-textcol-light dark:text-textcol-dark">
                    {popularNotes.map(note => <li key={note.id} className="truncate">{getLocalizedText(note.title, language)} ({note.views || 0} {t('views')})</li>)}
                  </ul>
                ) : <p className="text-sm text-gray-500 dark:text-gray-400">{t('noViewsYet')}</p>}
              </div>
            </div>
            <button
              onClick={() => { setEditingCategory(null); setShowCategoryEditor(true); }}
              className="mb-6 flex items-center px-4 py-2 bg-secondary-DEFAULT hover:bg-secondary-hover dark:bg-secondary-dark dark:hover:bg-secondary-darkhover text-black dark:text-white rounded-md shadow-md transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" /> {t('addNewCategory')}
            </button>
            
            {categories.length === 0 && notes.length === 0 && (
                 <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t('noNotesYetAdmin')}</p> 
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories
                .filter(cat => cat.id !== UNCATEGORIZED_CATEGORY_ID) 
                .sort((a,b) => getLocalizedText(a.name, language).localeCompare(getLocalizedText(b.name, language)))
                .map(cat => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  noteCount={notes.filter(note => note.category === cat.id).length}
                  onClick={() => handleSelectAdminCategory(cat.id)}
                  onEdit={() => { setEditingCategory(cat); setShowCategoryEditor(true); }}
                  onDelete={() => handleDeleteCategory(cat.id)}
                  t={t}
                  currentLanguage={language}
                />
              ))}
              {categories.find(c => c.id === UNCATEGORIZED_CATEGORY_ID) && 
                (notes.some(n => n.category === UNCATEGORIZED_CATEGORY_ID) || categories.length === 1 && categories[0].id === UNCATEGORIZED_CATEGORY_ID) && (
                  <CategoryCard
                    category={categories.find(c => c.id === UNCATEGORIZED_CATEGORY_ID)!}
                    noteCount={notes.filter(note => note.category === UNCATEGORIZED_CATEGORY_ID).length}
                    onClick={() => handleSelectAdminCategory(UNCATEGORIZED_CATEGORY_ID)}
                    onEdit={() => alert(t('cannotEditUncategorized'))} 
                    onDelete={() => alert(t('cannotDeleteUncategorized'))} 
                    t={t}
                    currentLanguage={language}
                  />
              )}
            </div>
          </>
        )}

        {currentView === 'ADMIN_CATEGORY_NOTES_VIEW' && selectedAdminCategoryId && currentSelectedCategoryName && (
          <>
            <button
              onClick={() => { 
                setEditingNote(null); 
                setShowNoteEditor(true); 
              }}
              className="mb-6 flex items-center px-4 py-2 bg-secondary-DEFAULT hover:bg-secondary-hover dark:bg-secondary-dark dark:hover:bg-secondary-darkhover text-black dark:text-white rounded-md shadow-md transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" /> {t('addNewNoteToCategory', { categoryName: currentSelectedCategoryName })}
            </button>
            
            {notes.filter(note => note.category === selectedAdminCategoryId).length === 0 ? (
                 <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t('noNotesInCategory')}</p>
            ) : (
                <div className="space-y-4">
                {notes
                    .filter(note => note.category === selectedAdminCategoryId)
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .map(note => {
                        const localizedNoteTitle = getLocalizedText(note.title, language);
                        return (
                            <div key={note.id} className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow flex justify-between items-center">
                                <div className="flex items-center flex-1 truncate pr-2">
                                    {note.pdfUrl && <PdfFileIcon className="w-5 h-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0" />}
                                    <h4 className="text-lg font-medium text-textcol-light dark:text-textcol-dark truncate" title={localizedNoteTitle}>
                                        {localizedNoteTitle}
                                    </h4>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0">
                                <button
                                    onClick={() => handleAdminPreviewNote(note)}
                                    className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                    aria-label={`${t('viewNoteLabelAdmin')} ${localizedNoteTitle}`}
                                >
                                    <EyeIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleEditNote(note)}
                                    className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    aria-label={`${t('editNoteLabel')} ${localizedNoteTitle}`}
                                >
                                    <EditIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    aria-label={`${t('deleteNoteLabel')} ${localizedNoteTitle}`}
                                >
                                <DeleteIcon className="w-5 h-5" />
                                </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
          </>
        )}
      </div>
    );
  };


  const renderMainContent = () => {
    if (currentView === 'ABOUT_US') {
      return <AboutUsPage content={aboutUsContent[language]} t={t} onClose={() => setCurrentView(userRole === UserRole.ADMIN ? 'ADMIN_CATEGORIES_VIEW' : 'NOTES_LIST')} />;
    }
    if (userRole === UserRole.ADMIN && currentView !== 'ADMIN_SETTINGS' && currentView !== 'NOTE_VIEWER') { 
      return renderAdminContent();
    }

    if (currentView === 'NOTE_VIEWER' && selectedNoteForView) {
        const categoryObject = categories.find(c => c.id === selectedNoteForView.category);
        const categoryDisplayName = categoryObject ? getLocalizedText(categoryObject.name, language) : getLocalizedText(DEFAULT_UNCATEGORIZED_CATEGORY_NAME, language);
        return <NoteViewer 
                  note={selectedNoteForView} 
                  categoryDisplayName={categoryDisplayName}
                  onClose={handleCloseNoteViewer}
                  t={t} 
                  setActiveTocItems={setActiveTocItems}
                  proseClass={currentProseClass} 
                  currentLanguage={language}
                />;
    }
    
    return ( 
        <>
        <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedReaderCategory}
            setSelectedCategory={setSelectedReaderCategory}
            categories={readerCategories.map(c => ({id: c.id, name: c.name}))} 
            showBookmarksOnly={showBookmarksOnly}
            setShowBookmarksOnly={setShowBookmarksOnly}
            t={t}
            currentLanguage={language}
        />
        {filteredReaderNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReaderNotes.map(note => {
                const categoryObject = categories.find(c => c.id === note.category);
                const categoryDisplayName = categoryObject ? getLocalizedText(categoryObject.name, language) : getLocalizedText(DEFAULT_UNCATEGORIZED_CATEGORY_NAME, language);
                return (
                    <NoteCard
                        key={note.id}
                        note={note}
                        role={UserRole.READER}
                        onView={handleViewNoteReader}
                        onToggleBookmark={toggleBookmark}
                        categoryName={categoryDisplayName}
                        t={t}
                        currentLanguage={language}
                    />
                );
            })}
            </div>
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">
            {t('noNotesMatchFilters')}
            </p>
        )}
        </>
    );
  };


  return (
    <div className={`min-h-screen flex flex-col ${currentTextSize}`}>
      <Header
        theme={theme}
        toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        currentLanguage={language}
        setLanguage={setLanguage}
        onSearchToggle={setShowGlobalSearch}
        isSearchVisible={showGlobalSearch}
        onSearchSubmit={handleGlobalSearchSubmit}
        appIconUrl={appIconUrl}
        t={t}
      />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        userRole={userRole}
        onAdminLoginClick={() => { setShowLoginModal(true); setIsDrawerOpen(false); }}
        onLogoutClick={handleLogout}
        theme={theme}
        setTheme={setTheme}
        textSizeValue={textSizeValue}
        setTextSizeValue={setTextSizeValue}
        isReadingModeEnabled={isReadingModeEnabled}
        setReadingModeEnabled={setReadingModeEnabled}
        onAboutUsClick={navigateToAboutUs}
        onEditAboutUsClick={navigateToAdminEditAboutUs}
        onAdminSettingsClick={navigateToAdminSettings}
        onEditTextClick={navigateToAdminEditText}
        onManageFooterSectionsClick={navigateToAdminManageFooter} // New prop
        t={t}
      />
      <main className="flex-grow container mx-auto p-4 sm:p-6 relative overflow-y-auto custom-scrollbar-hidden">
        {renderMainContent()}
      </main>

      {selectedNoteForView && activeTocItems.length > 0 && !selectedNoteForView.pdfUrl && ( // Hide TOC if PDF is shown
          <TableOfContents
              tocItems={activeTocItems}
              onItemClick={(id) => {
                  const element = document.getElementById(id);
                  if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsTocPanelOpen(false);
              }}
              isOpen={isTocPanelOpen}
              setIsOpen={setIsTocPanelOpen}
              t={t}
          />
      )}
      
      <BackToTopButton t={t} />

      {showNoteEditor && (
        <NoteEditor
          initialNote={editingNote}
          onSave={handleSaveNote}
          onCancel={() => { setShowNoteEditor(false); setEditingNote(null); }}
          categories={categories.filter(c => c.id === UNCATEGORIZED_CATEGORY_ID || c.isDeletable !== false)} 
          defaultCategoryId={editingNote ? editingNote.category : (selectedAdminCategoryId || UNCATEGORIZED_CATEGORY_ID)}
          t={t}
          currentLanguage={language}
        />
      )}
      {showCategoryEditor && (
        <CategoryEditor
          initialCategory={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => { setShowCategoryEditor(false); setEditingCategory(null);}}
          t={t}
        />
      )}
      {showFooterSectionEditor && userRole === UserRole.ADMIN && (
        <FooterSectionEditor
          initialSection={editingFooterSection}
          onSave={handleSaveFooterSection}
          onCancel={() => { setShowFooterSectionEditor(false); setEditingFooterSection(null); }}
          t={t}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setUserRole(UserRole.ADMIN);
            setShowLoginModal(false);
            setCurrentView('ADMIN_CATEGORIES_VIEW'); 
          }}
          adminPassword={adminPassword} 
          t={t}
        />
      )}
      {showAdminSettingsModal && userRole === UserRole.ADMIN && (
         <AdminSettingsModal
            isOpen={showAdminSettingsModal}
            onClose={() => { setShowAdminSettingsModal(false); setCurrentView('ADMIN_CATEGORIES_VIEW');}}
            currentAppIconUrl={appIconUrl}
            onAppIconUrlChange={setAppIconUrl}
            currentCustomPlayStoreIconUrl={customPlayStoreIconUrl}
            onCustomPlayStoreIconUrlChange={setCustomPlayStoreIconUrl}
            onPasswordChange={handlePasswordChange}
            t={t}
         />
      )}
      {showFooterSectionViewerModal && selectedFooterSectionForModal && (
        <FooterSectionViewerModal
          section={selectedFooterSectionForModal}
          onClose={() => {
            setShowFooterSectionViewerModal(false);
            setSelectedFooterSectionForModal(null);
          }}
          t={t}
          currentLanguage={language}
        />
      )}
      
      <footer className="py-6 border-t border-bordercol-light dark:border-bordercol-dark text-sm text-gray-500 dark:text-gray-400">
        <div className="container mx-auto px-4">
          {footerSections.filter(s => s.isVisible).sort((a,b) => a.order - b.order).length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
              {footerSections.filter(s => s.isVisible).sort((a,b) => a.order - b.order).map(section => {
                const sectionTitle = getLocalizedText(section.title, language);
                if (section.actionType === FooterSectionActionType.LINK && section.link) {
                  return (
                    <a
                      key={section.id}
                      href={section.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-DEFAULT dark:text-primary-dark hover:underline"
                      title={sectionTitle}
                    >
                      {section.linkIsPlayStore ? (
                        <img
                          src={customPlayStoreIconUrl || DEFAULT_PLAY_STORE_ICON_URL}
                          alt="Play Store" 
                          className="w-7 h-7 mr-1.5 object-contain"
                        />
                      ) : (
                        <ExternalLinkIcon className="w-4 h-4 mr-1.5" />
                      )}
                      {sectionTitle}
                    </a>
                  );
                } else if (section.actionType === FooterSectionActionType.MODAL_CONTENT && section.content) {
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleViewFooterSectionContent(section)}
                      className="flex items-center text-primary-DEFAULT dark:text-primary-dark hover:underline"
                      title={sectionTitle}
                    >
                      <DocumentTextIcon className="w-4 h-4 mr-1.5" />
                      {sectionTitle}
                    </button>
                  );
                }
                return null; 
              })}
            </div>
          )}
          <p className="text-center">© {new Date().getFullYear()} {t('noteReaderPro')}. {t('allRightsReserved')}.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .form-checkbox {
            appearance: none; padding: 0; print-color-adjust: exact; display: inline-block;
            vertical-align: middle; background-origin: border-box; user-select: none;
            flex-shrink: 0; height: 1rem; width: 1rem; color: #3b82f6;
            background-color: #fff; border-color: #6b7280; border-width: 1px; border-radius: 0.25rem;
        }
        .form-checkbox:checked {
            border-color: transparent; background-color: currentColor; background-size: 100% 100%;
            background-position: center; background-repeat: no-repeat;
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }
        .dark .form-checkbox { background-color: #374151; border-color: #4b5563; }
        .dark .form-checkbox:checked { color: #60a5fa; }
        .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
        .drawer { transition: transform 0.3s ease-in-out; }
        .drawer-open { transform: translateX(0); }
        .drawer-closed { transform: translateX(-100%); }
        .drawer-overlay { transition: opacity 0.3s ease-in-out; }

        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            scroll-margin-top: 6rem; 
        }
        .scroll-mt-24 { 
            scroll-margin-top: 6rem; 
        }

        #font-size-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px; 
          background: #588cff; 
          border-radius: 5px;
          outline: none;
          opacity: 0.9;
          transition: opacity .15s ease-in-out;
        }
        #font-size-slider:hover {
          opacity: 1;
        }
        #font-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px; 
          height: 20px; 
          background: #ffffff; 
          border-radius: 50%;
          border: 1px solid #ccc;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }
        #font-size-slider::-moz-range-thumb {
          width: 20px; 
          height: 20px; 
          background: #ffffff; 
          border-radius: 50%;
          border: 1px solid #ccc;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }
         #font-size-slider::-ms-thumb {
          width: 20px; 
          height: 20px; 
          background: #ffffff; 
          border-radius: 50%;
          border: 1px solid #ccc;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
        }
        #font-size-slider::-moz-range-track {
            width: 100%;
            height: 8px;
            background: #588cff;
            border-radius: 5px;
            cursor: pointer;
        }
        #font-size-slider::-ms-track {
            width: 100%;
            height: 8px;
            background: transparent; 
            border-color: transparent;
            color: transparent; 
            cursor: pointer;
        }
        #font-size-slider::-ms-fill-lower {
            background: #588cff;
            border-radius: 5px;
        }
        #font-size-slider::-ms-fill-upper {
            background: #588cff; 
            border-radius: 5px;
        }

      `}</style>
    </div>
  );
};

export default App;
