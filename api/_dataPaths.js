import path from "path";

const isVercel = Boolean(process.env.VERCEL);

const baseDataDir = isVercel
  ? path.join("/tmp", "portfolio-data")
  : path.join(process.cwd(), "backend", "data");

export const getDataDir = () => baseDataDir;

export const getDataFile = (fileName) => path.join(baseDataDir, fileName);
