import Swal from 'sweetalert2';

export const showDeleteConfirmation = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You are about to delete this patient.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      title: 'text-xl font-bold',
      content: 'text-gray-600',
      confirmButton: 'bg-red-500 hover:bg-red-600',
      cancelButton: 'bg-blue-500 hover:bg-blue-600',
    }
  });
};