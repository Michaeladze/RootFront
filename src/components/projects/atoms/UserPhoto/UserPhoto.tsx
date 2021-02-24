import React, {
  FC, useEffect, useState
} from 'react';

export interface IUserPhotoProps {
  className?: string;
  /** Ссылка на фото */
  url?: string;
  /** Фамилия и Имя */
  fullName?: string;
  /** Радиус */
  radius?: string;
}

const UserPhoto: FC<IUserPhotoProps> = ({ className = '', url = '', radius = '40px', fullName = '' }: IUserPhotoProps) => {
  const styles = radius ? {
    width: radius,
    height: radius,
    minWidth: radius,
    minHeight: radius
  } : {};
  const [initials, setInitials] = useState<string>('');

  useEffect(() => {
    if (fullName) {
      const [f, s]: string[] = fullName.split(' ');
      let text = '';
      f && (text = f.charAt(0).toUpperCase());
      s && (text += s.charAt(0).toUpperCase());
      setInitials(text);
    }
  }, [fullName]);

  return (
    <div className={`rf__user-photo ${className}`} style={{
      backgroundImage: `url(${url})`,
      ...styles
    }}>
      {!url && initials}
    </div>
  );
};

export default UserPhoto;
