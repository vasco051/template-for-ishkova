import {TemplatePage} from 'pages/template/Template.tsx';
import {NotFoundPage} from 'pages/not-found/NotFound.tsx';

import {staticLinks} from 'config/routingLinks.ts';

export const publicRoutes = [
  {
    path: staticLinks.main,
    element: <TemplatePage/>
  },
  {
    path: staticLinks.notFound,
    element: <NotFoundPage/>
  }
]