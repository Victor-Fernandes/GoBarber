import React from 'react';

import { AuthProvider } from './auth';

// global provider
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
