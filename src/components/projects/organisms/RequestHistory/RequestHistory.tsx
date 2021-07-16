import React, { useEffect, useState } from 'react';
import './RequestHistory.scss';
import EmptyUser from '../../../_icons/person-alt-outline';
import BiInfoCircle from '../../../_icons/info-circle';
import { IRequestPath, IUser } from '../../../../types/projects.types';
import {
  ContentExpander,
  formatDate, Tooltip, UserPhoto
} from '../../../../index';
import { IFormattedDate } from '../../../../types';


interface IProps {
  requestPath: IRequestPath[];
  initiator?: IUser;
}

const RequestHistory: React.FC<IProps> = ({ requestPath, initiator }: IProps) => {

  /** Показать / Скрыть историю */
  const [expanded, setExpanded] = useState<boolean>(false);

  const onExpand = () => {
    setExpanded(!expanded);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Фильтруем историю */
  const onPathFilter = (): IRequestPath[] => {
    const index = requestPath.findIndex((i: IRequestPath) => !i.statusId);
    const step = index >= 0 ? index : requestPath.length - 1;
    return requestPath.length > 0 ? expanded ? requestPath : [requestPath[step]] : [];
  };

  const [path, setPath] = useState<IRequestPath[]>([]);

  useEffect(() => {
    setPath(onPathFilter());
  }, [expanded, requestPath]);

  // -------------------------------------------------------------------------------------------------------------------
  const users = (users: IUser[] | null) => {
    return users?.map((item, i) => (
      <React.Fragment key={i}>
        {i < 5 ? (
          <div className='tooltip-users__wrapper'>
            <UserPhoto radius='40px' url={item.photo} />
            <div className='tooltip-users__info'>
              <p className='tooltip-users__name'>{item.fullName}</p>
              <p className='tooltip-users__position'>{item.department}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
    ));
  };
  const historyJSX = path.map((r: IRequestPath, i: number) => {
    const d: IFormattedDate | null = r.date ? formatDate(r.date + new Date().getTimezoneOffset() * 60 * 1000) : null;

    return (
      <div className='request__history-element' key={r.stepId}>
        <div className='history__user-photo'>
          {r.user && r.user.length === 1 ? <UserPhoto radius='48px' url={r.user[0].photo} /> : <EmptyUser className='empty-user' /> }
          {i !== path.length - 1 && (
            <div className='history__user-line'>
              <div className='history__user-line-inner' />
            </div>
          )}
        </div>

        <div className='history__details'>
          <div className='history__details-row'>
            <h4 className='history__details-name'>
              {(r.user && r.user.length === 1 && r.user[0].fullName) || r.agentName || initiator?.fullName}
            </h4>
            {!(r.user && r.user.length < 2) && (
              <Tooltip>
                <BiInfoCircle className='history__info'/>
                <div className='tooltip__wrapper'>{users(r.user)}</div>
              </Tooltip>
            )}

            {d && (
              <span className='history__details-date'>
                {d.dayOfMonth} {d.monthShort} {d.year} в {d.hour}:{d.minutes}
              </span>
            )}
          </div>
          <div className='history__details-row'>
            <span className='history__details-info'>{r.activityText}</span>
            <span className={`history__details-status history__details-status--${r.criticality}`}>{r.statusText}</span>
          </div>

          <div className={`history__details-row ${r.comment ? '' : 'history__details-row--ext'}`}>
            {r.comment && <div className='history__details-comment'>{r.comment}</div>}
          </div>
        </div>
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <ContentExpander title='Смотреть все' showTitle={requestPath.length > 1} onExpand={onExpand} expanded={expanded}>
      <div className='request__history'>{historyJSX}</div>
    </ContentExpander>
  );
};

export default RequestHistory;
