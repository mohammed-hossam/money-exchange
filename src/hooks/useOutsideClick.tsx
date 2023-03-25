import { useEffect } from 'react';

type UseOutsideClickProps = {
  ref: React.MutableRefObject<null | HTMLUListElement>;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  exceptionElementsRef: React.MutableRefObject<null | HTMLElement>[];
};

function useOutsideClick({
  ref,
  setter,
  exceptionElementsRef,
}: UseOutsideClickProps) {
  useEffect(() => {
    //     console.log(ref);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        exceptionElementsRef.some((exceptionElement) =>
          exceptionElement.current?.contains(e.target as Node)
        )
      )
        return;
      if (ref && ref.current && !ref.current.contains(e.target as Node)) {
        setter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setter]);
}

export default useOutsideClick;
