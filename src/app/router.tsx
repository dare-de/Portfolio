import { Navigate, Route, Routes } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { DesignSystemPreviewPage } from '@/pages/DesignSystemPreviewPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<DesignSystemPreviewPage />} />
        <Route path="/design-system" element={<DesignSystemPreviewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
