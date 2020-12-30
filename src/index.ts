import useClickOutside from './hooks/useClickOutside';
import { useLocation } from './hooks/useLocation';
import {
  formatDate, getMonthName, getShortString
} from './utils/helpers';

// ------------------------ Компоненты Atoms ---------------------------------------------------------------------------
import Button from './components/atoms/Button';
import Checkbox from './components/atoms/Checkbox';
import Notification from './components/atoms/Notification';
import Column from './components/atoms/Column/Column';
import Datepicker from './components/atoms/Datepicker';
import FileInput from './components/atoms/FileInput/FileInput';
import Input from './components/atoms/Input/Input';
import Radio from './components/atoms/Radio/Radio';
import Row from './components/atoms/Row/Row';
import Textarea from './components/atoms/Textarea/Textarea';
import Tooltip from './components/atoms/Tooltip/Tooltip';
import Container from './components/atoms/Container';
import Preloader from './components/atoms/Preloader';
import Message from './components/atoms/Message';
import Switch from './components/atoms/Switch';
import Tile from './components/atoms/Tile';
import ShareButton from './components/atoms/ShareButton';

// ------------------------ Компоненты Molecules -----------------------------------------------------------------------
import Notifications, { sendNotification } from './components/molecules/Notifications';
import FormGroup from './components/molecules/FormGroup/FormGroup';
import Modal from './components/molecules/Modal/Modal';
import Tabs from './components/molecules/Tabs/Tabs';
import Breadcrumbs from './components/molecules/Breadcrumbs';
import Timepicker from './components/molecules/Timepicker';
import ContentExpander from './components/molecules/ContentExpander';
import Chips from './components/molecules/Chips';
import Menu from './components/molecules/Menu';

// ------------------------ Компоненты Organisms -----------------------------------------------------------------------
import Select from './components/organisms/Select/Select';
import { openPopup, PopupMaker } from './components/organisms/PopupMaker';

// ------------------------ Компоненты Projects ------------------------------------------------------------------------
import FeedbackPopup from './components/projects/popups/FeedbackPopup';
import FindUsers from './components/projects/organisms/FindUsers';
import AppHeader from './components/projects/organisms/AppHeader';
import PageTemplate from './components/projects/organisms/PageTemplate';
import UserPhoto from './components/projects/atoms/UserPhoto';
import UserItem from './components/projects/molecules/User';
import UsersStack from './components/projects/molecules/UsersStack';
import PopupFooter from './components/projects/molecules/PopupFooter';

// ---------------------------------------------------------------------------------------------------------------------

export { useClickOutside, useLocation };
export {
  Switch,
  Tile,
  ShareButton,
  UserItem,
  Timepicker,
  PageTemplate,
  Breadcrumbs,
  Button,
  Preloader,
  Checkbox,
  Column,
  Notification,
  Datepicker,
  FileInput,
  Message,
  Input,
  Radio,
  Row,
  Textarea,
  Tooltip,
  PopupFooter,
  UserPhoto,
  Container,
  ContentExpander,
  Chips,
  Notifications,
  sendNotification,
  FormGroup,
  Modal,
  Tabs,
  Select,
  PopupMaker,
  openPopup,
  FindUsers,
  AppHeader,
  UsersStack,
  FeedbackPopup,
  Menu
};

export {
  formatDate, getShortString, getMonthName
};
