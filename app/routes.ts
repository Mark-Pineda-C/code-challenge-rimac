import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/steps-layout.tsx", [
      route("step-one", "routes/step-one.tsx"),
      route("step-two", "routes/step-two.tsx"),
  ])
] satisfies RouteConfig;
