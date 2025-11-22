import { Outlet } from 'react-router-dom';
import { Toast } from './components/common/Toast';
import { useToastStore } from './stores/toastStore';

function App() {
  const { message, type, isVisible, hideToast } = useToastStore();

  return (
    <>
      <Outlet />
      {isVisible && message && (
        <Toast message={message} type={type} onClose={hideToast} />
      )}
    </>
  );
}

export default App;
