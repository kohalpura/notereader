
import React from 'react';
import { Note, TextSize, TEXT_SIZE_MAP, Category, UNCATEGORIZED_CATEGORY_ID, LocalizedString, Language } from './types';

export const getLocalizedText = (localized: LocalizedString | undefined, lang: Language, fallbackLang: Language = 'en'): string => {
  if (!localized) {
    return ''; // Or some placeholder like "N/A"
  }
  const text = localized[lang] || localized[fallbackLang];
  return text || localized[fallbackLang] || localized.en || ''; // Ensure there's always some fallback
};


export const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: { en: 'Getting Started with React', ne: 'React को साथ सुरु गर्दै' },
    content: { 
      en: 'React is a JavaScript library for building user interfaces. Learn about components, props, and state.\n\nKey concepts:\n- JSX\n- Virtual DOM\n- Hooks (useState, useEffect)\n\n## Core React Principles\nReact follows a component-based architecture.\n\n### State Management\nUnderstanding state is crucial for dynamic UIs.',
      ne: 'React प्रयोगकर्ता इन्टरफेसहरू निर्माण गर्नका लागि एक JavaScript पुस्तकालय हो। कम्पोनेन्टहरू, प्रोप्स, र स्टेटको बारेमा जान्नुहोस्।\n\nमुख्य अवधारणाहरू:\n- JSX\n- भर्चुअल DOM\n- हुक्स (useState, useEffect)\n\n## कोर React सिद्धान्तहरू\nReact कम्पोनेन्ट-आधारित वास्तुकला अनुसरण गर्दछ।\n\n### स्टेट व्यवस्थापन\nगतिशील UIs का लागि स्टेट बुझ्नु महत्त्वपूर्ण छ।'
    },
    category: 'React', // This string will be used to find/create category ID with localized name
    tags: ['javascript', 'frontend', 'ui'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), 
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isBookmarked: false,
    views: 150,
  },
  {
    id: '2',
    title: { en: 'Tailwind CSS for Rapid UI Development', ne: 'छिटो UI विकासको लागि Tailwind CSS' },
    content: {
      en: 'Tailwind CSS is a utility-first CSS framework that allows for rapid UI development without writing custom CSS. \n\nBenefits:\n- Highly customizable\n- Responsive design built-in\n- Small bundle size with PurgeCSS\n\n## Utility Classes\nTailwind provides a vast set of utility classes.\n\n### Customization\nEasily customize Tailwind via its config file.',
      ne: 'Tailwind CSS एक युटिलिटी-पहिलो CSS फ्रेमवर्क हो जसले कस्टम CSS नलेखी छिटो UI विकास गर्न अनुमति दिन्छ।\n\nफाइदाहरू:\n- अत्यधिक अनुकूलन योग्य\n- उत्तरदायी डिजाइन निर्मित\n- PurgeCSS को साथ सानो बन्डल आकार\n\n## युटिलिटी क्लासहरू\nTailwind ले युटिलिटी क्लासहरूको विशाल सेट प्रदान गर्दछ।\n\n### अनुकूलन\nयसको कन्फिग फाइल मार्फत सजिलै Tailwind अनुकूलन गर्नुहोस्।'
    },
    category: 'CSS',
    tags: ['css', 'tailwind', 'styling', 'frontend'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    isBookmarked: true,
    views: 250,
  },
  {
    id: '3',
    title: { en: 'Advanced TypeScript Techniques', ne: 'उन्नत TypeScript प्रविधिहरू' },
    content: {
      en: 'Explore advanced TypeScript features like generics, decorators, and conditional types to build robust applications.\n\nTopics:\n- Mapped Types\n- Utility Types\n- Type Guards',
      ne: 'शक्तिशाली अनुप्रयोगहरू निर्माण गर्न जेनेरिक्स, डेकोरेटरहरू, र ससर्त प्रकारहरू जस्ता उन्नत TypeScript सुविधाहरू अन्वेषण गर्नुहोस्।\n\nविषयहरू:\n- म्याप गरिएका प्रकारहरू\n- युटिलिटी प्रकारहरू\n- प्रकार गार्डहरू'
    },
    category: 'TypeScript',
    tags: ['typescript', 'programming', 'types'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBookmarked: false,
    views: 80,
  },
   {
    id: '4',
    title: { en: 'Introduction to Node.js', ne: 'Node.js को परिचय' },
    content: {
      en: 'Node.js is a back-end JavaScript runtime environment. This note covers basic concepts like modules, file system operations, and asynchronous programming.',
      ne: 'Node.js एक ब्याक-एन्ड JavaScript रनटाइम वातावरण हो। यो नोटले मोड्युलहरू, फाइल प्रणाली सञ्चालनहरू, र एसिन्क्रोनस प्रोग्रामिङ जस्ता आधारभूत अवधारणाहरूलाई समेट्छ।'
    },
    category: 'Backend',
    tags: ['nodejs', 'javascript', 'server-side'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    isBookmarked: false,
    views: 120,
  },
  {
    id: '5',
    title: { en: 'Understanding React Context API', ne: 'React Context API बुझ्दै' },
    content: {
      en: 'A deep dive into React Context API for state management without prop drilling. Examples and use cases included.',
      ne: 'प्रोप ड्रिलिंग बिना स्टेट व्यवस्थापनको लागि React Context API मा गहिरो डुबाइ। उदाहरणहरू र प्रयोग केसहरू समावेश छन्।'
    },
    category: 'React',
    tags: ['react', 'state management', 'frontend'],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    isBookmarked: true,
    views: 95,
  },
  {
    id: '6',
    title: { en: 'Comprehensive Guide to Modern Web Development', ne: 'आधुनिक वेब विकासको लागि विस्तृत गाइड' },
    content: {
        en: `This guide provides an overview of modern web development, covering frontend and backend technologies, as well as deployment strategies. It's designed for both beginners and those looking to update their skills.
    
## Chapter 1: Frontend Fundamentals
The frontend is what users see and interact with. Mastering its core components is crucial.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 1.1 HTML: The Structure
HyperText Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It provides the basic structure of sites, which is enhanced and modified by other technologies like CSS and JavaScript.
Key elements include headings, paragraphs, lists, links, images, and forms. Semantic HTML (using tags like <article>, <aside>, <nav>, <section>) is important for accessibility and SEO. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### 1.2 CSS: Styling the Web
Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
Concepts like the box model, flexbox, grid, and responsive design (media queries) are fundamental. CSS preprocessors (Sass, Less) and utility-first frameworks (Tailwind CSS) can streamline development. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### 1.3 JavaScript: Interactivity
JavaScript (JS) is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
It enables dynamic content, user interaction, and asynchronous communication (AJAX). Modern JavaScript (ES6+) features like arrow functions, promises, async/await, and modules are widely used. Frameworks like React, Angular, and Vue.js build upon JavaScript. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

## Chapter 2: Backend Technologies
The backend, or server-side, handles data storage, business logic, and serving content to the frontend.
Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.

### 2.1 Node.js and Express
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server. Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
It's known for its non-blocking I/O model, making it efficient for I/O-bound applications. The npm (Node Package Manager) ecosystem is vast. Donec et neque lectus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

### 2.2 Databases: SQL vs NoSQL
Databases are essential for storing and retrieving application data. They broadly fall into SQL (relational) and NoSQL (non-relational) categories.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

#### 2.2.1 PostgreSQL
PostgreSQL is a powerful, open-source object-relational database system known for its reliability, feature robustness, and performance. It supports complex queries and transactions. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

#### 2.2.2 MongoDB
MongoDB is a popular NoSQL document database. It stores data in flexible, JSON-like documents (BSON). It's known for scalability and ease of use with evolving data schemas. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

## Chapter 3: Full-Stack Frameworks
Full-stack frameworks provide tools and conventions for building both frontend and backend parts of an application.
Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

### 3.1 React and Next.js
Next.js is a popular React framework that enables functionalities like server-side rendering (SSR), static site generation (SSG), file-system routing, and API routes. It simplifies building production-ready React applications. Maecenas sed diam eget risus varius blandit sit amet non magna.

### 3.2 Vue and Nuxt.js
Nuxt.js is to Vue.js what Next.js is to React. It's a progressive framework for building Vue.js applications, offering SSR, SSG, and other powerful features out of the box. Nullam id dolor id nibh ultricies vehicula ut id elit.

## Chapter 4: Deployment and DevOps
Getting your application to users and maintaining it involves deployment and DevOps practices.
Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### 4.1 Docker and Containerization
Docker is a platform for developing, shipping, and running applications in containers. Containers package application code with all its dependencies, ensuring consistency across environments. This simplifies deployment and scaling. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### 4.2 CI/CD Pipelines
Continuous Integration (CI) and Continuous Delivery/Deployment (CD) are practices that automate the software build, test, and release process. Tools like Jenkins, GitLab CI, GitHub Actions help implement these pipelines, leading to faster and more reliable releases. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

## Conclusion
Modern web development is a vast and ever-evolving field. By understanding these core concepts and technologies, developers can build powerful and engaging web applications. Continuous learning is key to staying current.
Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus auctor fringilla.`,
        ne: `यो गाइडले आधुनिक वेब विकासको एक सिंहावलोकन प्रदान गर्दछ, फ्रन्टएन्ड र ब्याकएन्ड प्रविधिहरू, साथै डिप्लोयमेन्ट रणनीतिहरू समेट्छ। यो दुबै शुरुवातकर्ताहरू र आफ्नो सीप अद्यावधिक गर्न खोज्नेहरूका लागि डिजाइन गरिएको हो।
    
## अध्याय १: फ्रन्टएन्ड आधारभूतहरू
फ्रन्टएन्ड त्यो हो जुन प्रयोगकर्ताहरूले देख्छन् र अन्तरक्रिया गर्छन्। यसको मुख्य कम्पोनेन्टहरूमा महारत हासिल गर्नु महत्त्वपूर्ण छ।
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### १.१ HTML: संरचना
HyperText Markup Language (HTML) वेब ब्राउजरमा प्रदर्शन गर्न डिजाइन गरिएका कागजातहरूको लागि मानक मार्कअप भाषा हो। यसले साइटहरूको आधारभूत संरचना प्रदान गर्दछ, जुन CSS र JavaScript जस्ता अन्य प्रविधिहरूद्वारा परिष्कृत र परिमार्जन गरिन्छ।
मुख्य तत्वहरूमा हेडिङ, अनुच्छेद, सूची, लिङ्क, छवि, र फारमहरू समावेश छन्। सिमान्टिक HTML (जस्तै <article>, <aside>, <nav>, <section> ट्यागहरू प्रयोग गरेर) पहुँचयोग्यता र SEO को लागि महत्त्वपूर्ण छ। Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### १.२ CSS: वेब स्टाइलिंग
Cascading Style Sheets (CSS) HTML जस्तो मार्कअप भाषामा लेखिएको कागजातको प्रस्तुतीकरण वर्णन गर्न प्रयोग गरिने स्टाइल पाना भाषा हो। CSS, HTML र JavaScript को साथमा, World Wide Web को एक आधारशिला प्रविधि हो।
बक्स मोडेल, फ्लेक्सबक्स, ग्रिड, र उत्तरदायी डिजाइन (मिडिया क्वेरीहरू) जस्ता अवधारणाहरू आधारभूत छन्। CSS प्रीप्रोसेसरहरू (Sass, Less) र युटिलिटी-पहिलो फ्रेमवर्कहरू (Tailwind CSS) ले विकासलाई सुव्यवस्थित गर्न सक्छन्। Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### १.३ JavaScript: अन्तरक्रियात्मकता
JavaScript (JS) ECMAScript स्पेसिफिकेसन अनुरूप प्रोग्रामिङ भाषा हो। JavaScript उच्च-स्तर, प्रायः जस्ट-इन-टाइम कम्पाइल गरिएको, र बहु-प्याराडाइम हो। यसमा कर्ली-कोष्ठक सिन्ट्याक्स, डायनामिक टाइपिङ, प्रोटोटाइप-आधारित वस्तु-अभिविन्यास, र प्रथम-श्रेणी प्रकार्यहरू छन्।
यसले गतिशील सामग्री, प्रयोगकर्ता अन्तरक्रिया, र एसिन्क्रोनस सञ्चार (AJAX) सक्षम गर्दछ। आधुनिक JavaScript (ES6+) सुविधाहरू जस्तै एरो प्रकार्यहरू, प्रोमिसहरू, एसिन्क/अवेट, र मोड्युलहरू व्यापक रूपमा प्रयोग गरिन्छ। React, Angular, र Vue.js जस्ता फ्रेमवर्कहरू JavaScript मा निर्माण हुन्छन्। Ut enim ad minim veniam, quis nostrud exercitation ullamco.

## अध्याय २: ब्याकएन्ड प्रविधिहरू
ब्याकएन्ड, वा सर्भर-साइड, डेटा भण्डारण, व्यापार तर्क, र फ्रन्टएन्डमा सामग्री सेवा गर्ने काम गर्दछ।
Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.

### २.१ Node.js र Express
Node.js Chrome को V8 JavaScript इन्जिनमा निर्मित JavaScript रनटाइम हो। यसले विकासकर्ताहरूलाई सर्भरमा JavaScript चलाउन अनुमति दिन्छ। Express.js एक न्यूनतम र लचिलो Node.js वेब अनुप्रयोग फ्रेमवर्क हो जसले वेब र मोबाइल अनुप्रयोगहरूको लागि सुविधाहरूको एक बलियो सेट प्रदान गर्दछ।
यो यसको गैर-ब्लकिङ I/O मोडेलको लागि परिचित छ, जसले यसलाई I/O-बाउन्ड अनुप्रयोगहरूको लागि कुशल बनाउँछ। npm (Node Package Manager) इकोसिस्टम विशाल छ। Donec et neque lectus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

### २.२ डाटाबेसहरू: SQL vs NoSQL
डाटाबेसहरू अनुप्रयोग डेटा भण्डारण र पुन: प्राप्ति गर्न आवश्यक छन्। तिनीहरू व्यापक रूपमा SQL (सम्बन्धित) र NoSQL (गैर-सम्बन्धित) श्रेणीहरूमा पर्दछन्।
Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

#### २.२.१ PostgreSQL
PostgreSQL एक शक्तिशाली, खुला स्रोत वस्तु-सम्बन्धित डाटाबेस प्रणाली हो जुन यसको विश्वसनीयता, सुविधा सुदृढता, र प्रदर्शनको लागि परिचित छ। यसले जटिल प्रश्नहरू र लेनदेनहरूलाई समर्थन गर्दछ। Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

#### २.२.२ MongoDB
MongoDB एक लोकप्रिय NoSQL कागजात डाटाबेस हो। यसले लचिलो, JSON-जस्तो कागजातहरू (BSON) मा डेटा भण्डारण गर्दछ। यो स्केलेबिलिटी र विकसित डेटा स्किमाहरूको साथ प्रयोगको सहजताको लागि परिचित छ। Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

## अध्याय ३: फुल-स्ट्याक फ्रेमवर्कहरू
फुल-स्ट्याक फ्रेमवर्कहरूले अनुप्रयोगको फ्रन्टएन्ड र ब्याकएन्ड दुवै भागहरू निर्माण गर्नका लागि उपकरण र अधिवेशनहरू प्रदान गर्दछ।
Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

### ३.१ React र Next.js
Next.js एक लोकप्रिय React फ्रेमवर्क हो जसले सर्भर-साइड रेन्डरिङ (SSR), स्थिर साइट जेनेरेसन (SSG), फाइल-सिस्टम रूटिङ, र API रूटहरू जस्ता कार्यक्षमताहरू सक्षम गर्दछ। यसले उत्पादन-तयार React अनुप्रयोगहरू निर्माण गर्न सरल बनाउँछ। Maecenas sed diam eget risus varius blandit sit amet non magna.

### ३.२ Vue र Nuxt.js
Nuxt.js Vue.js को लागि Next.js React को लागि जस्तै हो। यो Vue.js अनुप्रयोगहरू निर्माण गर्नको लागि एक प्रगतिशील फ्रेमवर्क हो, जसले SSR, SSG, र अन्य शक्तिशाली सुविधाहरू बाहिर-को-बाकस प्रस्ताव गर्दछ। Nullam id dolor id nibh ultricies vehicula ut id elit.

## अध्याय ४: डिप्लोयमेन्ट र DevOps
आफ्नो अनुप्रयोग प्रयोगकर्ताहरू समक्ष पुर्‍याउनु र यसलाई कायम राख्नुमा डिप्लोयमेन्ट र DevOps अभ्यासहरू समावेश छन्।
Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### ४.१ Docker र कन्टेनराइजेसन
Docker कन्टेनरहरूमा अनुप्रयोगहरू विकास, ढुवानी, र चलाउनको लागि एक प्लेटफर्म हो। कन्टेनरहरूले अनुप्रयोग कोडलाई यसका सबै निर्भरताहरूसँग प्याकेज गर्दछ, वातावरणहरूमा स्थिरता सुनिश्चित गर्दछ। यसले डिप्लोयमेन्ट र स्केलिंगलाई सरल बनाउँछ। Lorem ipsum dolor sit amet, consectetur adipiscing elit.

### ४.२ CI/CD पाइपलाइनहरू
Continuous Integration (CI) र Continuous Delivery/Deployment (CD) सफ्टवेयर निर्माण, परीक्षण, र रिलीज प्रक्रियालाई स्वचालित गर्ने अभ्यासहरू हुन्। Jenkins, GitLab CI, GitHub Actions जस्ता उपकरणहरूले यी पाइपलाइनहरू कार्यान्वयन गर्न मद्दत गर्दछ, जसले छिटो र अधिक भरपर्दो रिलीजहरू निम्त्याउँछ। Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

## निष्कर्ष
आधुनिक वेब विकास एक विशाल र सधैं विकसित हुने क्षेत्र हो। यी मुख्य अवधारणाहरू र प्रविधिहरू बुझेर, विकासकर्ताहरूले शक्तिशाली र आकर्षक वेब अनुप्रयोगहरू निर्माण गर्न सक्छन्। निरन्तर सिकाइ वर्तमान रहनको लागि कुञ्जी हो।
Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus auctor fringilla.`
    },
    category: 'Backend', // Initially a string, will be mapped to ID
    tags: ['web development', 'full-stack', 'guide', 'html', 'css', 'javascript', 'nodejs', 'react', 'devops'],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    isBookmarked: false,
    views: 35,
  },
];

export const DEFAULT_UNCATEGORIZED_CATEGORY_NAME: LocalizedString = { 
  en: "Uncategorized", 
  ne: "अवर्गीकृत" 
};

export const INITIAL_CATEGORIES: Category[] = [
    { id: UNCATEGORIZED_CATEGORY_ID, name: DEFAULT_UNCATEGORIZED_CATEGORY_NAME, isDeletable: false },
    // Other categories will be derived from notes or added by admin
];

// Admin Credentials (can be updated via settings in UI)
export const ADMIN_USERNAME = "Dahit"; // Username for login check remains constant
export const INITIAL_ADMIN_PASSWORD = "Dahit@2050";


export const getTextSizeClass = (size: TextSize | string): string => {
  if (Object.values(TextSize).includes(size as TextSize)) {
    return size as string;
  }
  if (typeof size === 'string' && TEXT_SIZE_MAP[size]) {
    return TEXT_SIZE_MAP[size];
  }
  return TextSize.MEDIUM; 
};


// SVG Icons
export const AppLogoIcon: React.FC<{ className?: string, src?: string | null }> = ({ className = "w-8 h-8", src }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false); // Reset error state when src changes
  }, [src]);

  if (src && !hasError) {
    return (
      <img 
        src={src} 
        alt="App Logo" 
        className={className} 
        onError={() => setHasError(true)} 
      />
    );
  }
  // Fallback icon if src is null, empty, or image failed to load
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
      <path d="M12 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
    </svg>
  );
};


export const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

export const DeleteIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.03 3.22.077m3.22-.077L10.875 5.79m.488 0c2.275.058 4.5.117 6.725.18a48.05 48.05 0 01-3.478-.397m-6.725-.18a48.05 48.05 0 00-3.478.397m6.725.18c-.944 1.939-2.99 3.21-5.365 3.21S2.01 9.862.96 7.922M12 21V11.085" />
  </svg>
);

export const BookmarkIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className = "w-5 h-5", filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

// Add ChevronUpIcon
export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M14.78 11.78a.75.75 0 01-1.06 0L10 8.06l-3.72 3.72a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z" clipRule="evenodd" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const LanguageIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3H7.5A1.5 1.5 0 006 19.5V4.5A1.5 1.5 0 017.5 3h7.5c.21 0 .415.038.606.107M10.5 7.5H15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.9 0-7.217 2.238-8.75 5.455M4.5 19.5h.008v.008H4.5v-.008z" />
 </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M15.75 9l-3.75-3.75M15.75 9l3.75 3.75M15.75 12H3" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const AccessibilityIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-6.75 3h9.75m-1.5 3h3M3.75 21h16.5M5.25 6H5.25m13.5 0H18.75M9 21V9.75M15 21V9.75M5.25 12H5.25m13.5 0H18.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
</svg>
);

export const CollectionIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 1.905c-.007.378.138.75-.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.583.495-.646.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.646-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 010-1.905c.007-.378-.138.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.646-.869l.213-1.28z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TocListIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

export const ImportIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.043 6.848A4.505 4.505 0 0117.25 19.5H6.75z" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const PdfFileIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18.75h3m-3.75-3.75h.008v.008H9.75v-.008zm0-3h.008v.008H9.75v-.008zm0-3h.008v.008H9.75v-.008zm0-3h.008v.008H9.75v-.008zM15 11.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V11.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15c.063.09.132.172.206.25H9.375a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75H7.5v-3z" />
  </svg>
);

export const PlayStoreIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M310.2 255.9l-108-108.2c-11.7-11.6-30.9-11.6-42.7 0-11.7 11.7-11.7 30.8 0 42.6L225 256l-65.4 65.6c-11.7 11.7-11.7 30.8 0 42.6 5.9 5.9 13.6 8.8 21.3 8.8 7.8 0 15.4-2.9 21.3-8.8l108.1-108.2c11.7-11.7 11.7-30.9 0-42.6z" fill="#FFD947"></path>
    <path d="M147.4 105.2L342.9 244c18.9 13.2 20.7 40.9 4.4 56.6L189.7 477.6c-11.3 10.8-28.4 9.3-37.4-3.9-8.9-13.1-5.4-31.7 7.7-40.5L300.8 288 117.7 149.5c-13.1-9-16.5-27.5-7.7-40.6 9.1-13.1 27.5-16.4 40.6-7.7 2.1 1.5 3.9 3.2 5.8 5z" fill="#005BFD"></path>
    <path d="M451.9 213.5L100.5 27.9c-12.2-6.6-27.2-3.3-35.9 8.3-8.7 11.6-7 28.9 4.2 37.5l320.1 167.8c15.3 8 35.2-.3 35.2-18.2.1-2.9-.4-5.8-1.2-8.4-1.9-6.3-1-12.9 2.2-17.7 3.3-4.9 8.2-7.8 13.6-8.2 1-.1 2.1-.1 3.1-.1 5.2 0 10.1 1.7 14.2 4.8 1.2.9 2.3 1.9 3.3 2.9 10.8 11.2 3.8 30-9.7 33.4l-320.2 83.7c-13.9 3.6-28.6-4.9-32.2-18.8-3.6-13.9 4.9-28.6 18.8-32.2l320.1-83.7c7.2-1.9 12.1-8.6 10.3-15.8-1.9-7.2-8.6-12.1-15.8-10.2l-1.5.4z" fill="#00D662"></path>
    <path d="M451.9 298.4l-351.3 185.6C88.4 490.6 73.4 487.2 64.7 475.7c-8.7-11.6-7-28.9 4.2-37.5L389 270.4c15.3-8 35.2.3 35.2-18.2-.1-2.9-.4-5.8-1.2-8.4-1.9-6.3-1-12.9 2.2-17.7 3.3-4.9 8.2-7.8 13.6-8.2 1-.1 2.1-.1 3.1-.1 5.2 0 10.1 1.7 14.2 4.8 1.2.9 2.3 1.9 3.3 2.9 10.8 11.2 3.8 30-9.7 33.4L129.7 442.1c-13.9 3.6-28.6-4.9-32.2-18.8-3.6-13.9 4.9-28.6 18.8-32.2l320.1-83.7c7.2-1.9 12.1-8.6 10.3-15.8-1.8-7.2-8.5-12.1-15.7-10.2l-1.5.4z" fill="#FF362C"></path>
  </svg>
);


export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 17.25h6M9 14.25h6M9 11.25h6M4.5 19.5h15a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H4.5A1.5 1.5 0 003 6v12.5a1.5 1.5 0 001.5 1.5z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const VisibilityIcon: React.FC<{ className?: string }> = EyeIcon; // Alias EyeIcon for visibility
export const VisibilityOffIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L6.228 6.228" />
  </svg>
);


export const DEFAULT_ABOUT_US_CONTENT_EN = `
Welcome to NoteReader Pro!

Our mission is to provide a seamless and enjoyable experience for reading and managing notes. 
Whether you're a casual reader or an administrator curating content, our platform is designed with you in mind.

Key Features:
- Clean, responsive interface for readers.
- Powerful admin tools for content management.
- Customizable themes and text sizes.
- Search and categorization for easy navigation.

Thank you for using NoteReader Pro!
`;

export const DEFAULT_ABOUT_US_CONTENT_NE = `
नोटरिडर प्रोमा स्वागत छ!

हाम्रो उद्देश्य नोटहरू पढ्न र व्यवस्थापन गर्न सहज र आनन्ददायी अनुभव प्रदान गर्नु हो।
चाहे तपाईं एक सामान्य पाठक हुनुहुन्छ वा सामग्री क्युरेट गर्ने प्रशासक, हाम्रो प्लेटफर्म तपाईंलाई ध्यानमा राखेर डिजाइन गरिएको हो।

मुख्य विशेषताहरू:
- पाठकहरूको लागि सफा, उत्तरदायी इन्टरफेस।
- सामग्री व्यवस्थापनको लागि शक्तिशाली व्यवस्थापक उपकरणहरू।
- अनुकूलन योग्य विषयवस्तु र पाठ आकारहरू।
- सजिलो नेभिगेसनको लागि खोज र वर्गीकरण।

नोटरिडर प्रो प्रयोग गर्नुभएकोमा धन्यवाद!
`;

// Helper function to find URLs in text and wrap them in <a> tags
export const linkifyContent = (text: string): string => {
  if (!text) return '';
  // Regex to find URLs (http, https, ftp, file) and www. domains
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, (url) => {
    let fullUrl = url;
    // Prepend http:// to www. domains if they don't have a protocol
    if (url.toLowerCase().startsWith('www.')) {
      fullUrl = 'http://' + url;
    }
    // Rely on prose styles for link appearance
    return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};
