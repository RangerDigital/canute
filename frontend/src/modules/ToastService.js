import { useToast, POSITION } from 'vue-toastification';
import CloseButton from '@/components/toasts/CloseButton.vue';

import SuccessToast from '@/components/toasts/SuccessToast.vue';
import RefreshToast from '@/components/toasts/RefreshToast.vue';

class ToastService {
  constructor() {
    this.toast = useToast();

    this.options = {
      position: POSITION.BOTTOM_RIGHT,
      showCloseButtonOnHover: true,

      hideProgressBar: true,
      icon: false,
      closeButton: CloseButton,
    };
  }

  success(options) {
    const styling = { toastClassName: ['p-3', 'bg-gray-darker', 'text-white', 'md:rounded', 'md:shadow-md'] };

    this.toast(SuccessToast, {
      ...this.options,
      ...styling,
      ...options,
    });
  }

  refresh(options, workerInstance) {
    const styling = { toastClassName: ['p-3', 'bg-gray-darker', 'text-white', 'md:rounded', 'md:shadow-md'] };

    this.toast(
      {
        component: RefreshToast,
        props: {
          workerInstance: workerInstance,
        },
      },
      {
        ...this.options,
        ...styling,
        ...options,
      }
    );
  }
}

export default new ToastService();
