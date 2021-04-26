import React from 'react';
import { ITreeOption } from '../../../types';
import './FolderItem.scss';
interface IFolderItemProps {
    item: ITreeOption;
    depth: number;
    open: boolean;
    parent?: ITreeOption;
    onChange: (f: boolean, o: ITreeOption) => void;
    multiple: boolean;
    activeItem: ITreeOption | undefined;
}
declare const FolderItem: React.FC<IFolderItemProps>;
export default FolderItem;
