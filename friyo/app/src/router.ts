import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("./components/Dashboard.vue"),
    name: "dashboard.index",
  },

  {
    path: "/dispenser",
    component: () => import("./components/Dispenser.vue"),
    name: "dispenser.index",
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

// Create middleware pipeline
const middlewarePipeline = (context: any, middleware: any[], index: number) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return (param: any) => {
    if (param) {
      return context.next(param);
    }

    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
};

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware: any[] = to.meta.middleware as any[];

  const context = { to, from, next };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
