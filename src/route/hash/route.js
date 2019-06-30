import A from './A';
import B from './B';


const router = {
    '/a': {
        template: A,
        name: 'a标签路由'
    },
    '/b': {
        template: B,
        name: 'b标签路由'
    }
};

export default router;