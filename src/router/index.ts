import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import {routes } from './config';

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
})


export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  navigateResolver(navigate);
  return element
}

