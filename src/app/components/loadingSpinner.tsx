import { Spinner } from "@nextui-org/react";

export function LoadingSpinner() {
  return (
    <div className="fixed flex justify-center items-center bg-gray-300 bg-opacity-10 backdrop-blur-sm w-full h-full z-50">
      <Spinner size="lg"/>
    </div>
  )
}