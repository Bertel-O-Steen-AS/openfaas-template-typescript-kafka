import { existsSync, promises } from 'fs';

export const getKubernetesSecret = async (
  secretName: string,
  subPath = null,
  secretMountPath = '/var/openfaas/secrets',
): Promise<string> => {
  const subFolder = typeof subPath === 'string' ? (subPath.endsWith('/') ? subPath : `${subPath}/`) : '';
  const secretPath = `${secretMountPath}/${subFolder}${secretName}`;
  console.log('Retrieving secret from path ', secretPath);
  if (existsSync(secretPath)) {
    const data = await promises.readFile(secretPath);
    return data.toString();
  } else {
    console.error('No secret found on path ', secretPath);
  }
  return null;
};
