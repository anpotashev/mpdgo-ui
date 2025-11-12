import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '@/store/store';

// Типизированный useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Типизированный useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;