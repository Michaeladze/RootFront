import './styles/index.scss';

import useClickOutside from './hooks/useClickOutside';
import { useLocation } from './hooks/useLocation';
import {
  formatDate, getMonthName, getShortString, oDataTransform, stringToDate, numberWithSpaces
} from './utils/helpers';
import { treeDeepSearch } from './utils/treeHelpers';

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
import BackdropLoader from './components/atoms/BackdropLoader';
import Badge from './components/atoms/Badge/Badge';
import Tag from './components/atoms/Tag/Tag';
import InputCreditCard from './components/atoms/InputCreditCard/InputCreditCard';
import InputNumber from './components/atoms/InputNumber/InputNumber';
import InputPhone from './components/atoms/InputPhone/InputPhone';

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
import FatalError from './components/molecules/FatalError';

// ------------------------ Компоненты Organisms -----------------------------------------------------------------------
import SelectTree from './components/organisms/SelectTree';
import Select from './components/organisms/Select';
import NewDatepicker from './components/organisms/NewDatepicker';
import TextEditor from './components/organisms/TextEditor';
import Logger, { logRecord, reduxLogMiddleware } from './components/organisms/Logger/Logger';
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
import Structure from './components/projects/atoms/Structure';
import Confirm from './components/projects/popups/Confirm';

// ------------------------ Компоненты Templates ------------------------------------------------------------------------
import Page from './components/projects/templates/Page';
import PageWithSections from './components/projects/templates/PageWithSections';
import PageWithList from './components/projects/templates/PageWithList';
import ActionMenu from './components/projects/templates/ActionMenu';

// --------------------------Иконки-------------------------------------------------------------------------------------

import Copy from './components/_icons/copy';
import Envelope from './components/_icons/envelope';
import Headset from './components/_icons/headset';
import MenuOutline from './components/_icons/menu-outline';
import Bell from './components/_icons/bell';
import People from './components/_icons/people';
import QuestionCircle from './components/_icons/question-circle';
import Settings from './components/_icons/settings';
import DotsHorizontal from './components/_icons/dots-h';
import InfoCircle from './components/_icons/info-circle';
import PersonAddOutline from './components/_icons/person-add-outline';
import BoxGrid from './components/_icons/box-grid';
import Close from './components/_icons/close';
import Forward from './components/_icons/forward';

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
  Menu,
  BackdropLoader,
  TextEditor,
  Page,
  PageWithSections,
  PageWithList,
  Badge,
  ActionMenu,
  Structure,
  NewDatepicker,
  Confirm,
  SelectTree,
  Tag,
  InputPhone,
  InputCreditCard,
  InputNumber,
  FatalError,
  Logger
};

export {
  formatDate, getShortString, getMonthName, oDataTransform, stringToDate, treeDeepSearch, numberWithSpaces, logRecord, reduxLogMiddleware
};


export {
  Copy,
  Envelope,
  Headset,
  MenuOutline,
  Bell,
  People,
  QuestionCircle,
  Settings,
  DotsHorizontal,
  InfoCircle,
  PersonAddOutline,
  BoxGrid,
  Close,
  Forward
};
