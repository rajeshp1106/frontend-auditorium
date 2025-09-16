// src/utils/confirmToast.js
import toast from "react-hot-toast";
import React from "react";

export function confirmToast(message, onConfirm) {
  const id = toast(
    (t) => (
      <div className="space-y-3">
        <p className="text-sm text-gray-900 font-medium">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    { duration: 60000, id } // keep it open until user acts
  );
}
