// Real brand logos served from the Devicon CDN (jsDelivr) — no local assets
// needed. Only technologies with an actual recognizable logo are listed here;
// pure concepts (REST APIs, CORS, XSS, Design Systems, etc.) don't have a
// brand mark to show and are left out on purpose.

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const devicon = (path) => `${DEVICON_BASE}/${path}.svg`;

export const skills = [
  { title: 'HTML5', src: devicon('html5/html5-original') },
  { title: 'CSS3', src: devicon('css3/css3-original') },
  { title: 'JavaScript', src: devicon('javascript/javascript-original') },
  { title: 'TypeScript', src: devicon('typescript/typescript-original') },
  { title: 'React', src: devicon('react/react-original') },
  { title: 'Next.js', src: devicon('nextjs/nextjs-original') },
  { title: 'Vite', src: devicon('vitejs/vitejs-original') },
  { title: 'Tailwind CSS', src: devicon('tailwindcss/tailwindcss-original') },
  { title: 'Node.js', src: devicon('nodejs/nodejs-original') },
  { title: 'Express', src: devicon('express/express-original') },
  { title: 'MySQL', src: devicon('mysql/mysql-original') },
  { title: 'PostgreSQL', src: devicon('postgresql/postgresql-original') },
  { title: 'SQLite', src: devicon('sqlite/sqlite-original') },
  { title: 'MongoDB', src: devicon('mongodb/mongodb-original') },
  { title: 'Supabase', src: devicon('supabase/supabase-original') },
  { title: 'Prisma', src: devicon('prisma/prisma-original') },
  { title: 'Java', src: devicon('java/java-original') },
  { title: 'Python', src: devicon('python/python-original') },
  { title: 'C', src: devicon('c/c-original') },
  { title: 'C++', src: devicon('cplusplus/cplusplus-original') },
  { title: 'C#', src: devicon('csharp/csharp-original') },
  { title: 'PHP', src: devicon('php/php-original') },
  { title: 'Figma', src: devicon('figma/figma-original') },
  { title: 'Git', src: devicon('git/git-original') },
  { title: 'GitHub', src: devicon('github/github-original') },
  { title: 'Postman', src: devicon('postman/postman-original') },
  { title: 'Vercel', src: devicon('vercel/vercel-original') },
  { title: 'Docker', src: devicon('docker/docker-original') },
];
