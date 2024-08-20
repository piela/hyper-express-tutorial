import HyperExpress from "hyper-express";
export default function grantsMiddelware(grants: Array<String>) {
  return (
    req: HyperExpress.Request,
    res: HyperExpress.Response,
    next: Function
  ) => {
    const token = req.locals.token;

    if (!token) {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }

    const roles = token.resource_access["www-client"].roles;
    const hasGrant = roles.some((element: string) => {
      return grants.includes(element);
    });

    if (hasGrant) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
      return null;
    }
  };
}
