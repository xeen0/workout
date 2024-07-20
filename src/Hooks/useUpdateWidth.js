import { useEffect, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { graphWidthAtom } from '../Atoms/GraphNodesAtom';

const useUpdateWidth = () => {
  const setWidth = useSetAtom(graphWidthAtom);

  const updateWidth = useCallback(() => {
    const element = document.getElementById('graphArea');
    console.log(element.offsetWidth)
    if (element) {
      setWidth(element.offsetWidth - 97);
    }
  }, [setWidth]);

  useEffect(() => {
    updateWidth(); 
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]);
};

export default useUpdateWidth;
