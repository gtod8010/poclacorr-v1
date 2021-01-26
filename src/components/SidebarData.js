import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'home',
    path: '/home',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: '유저관리',
    path: '/usermanagement',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: '개발관리자',
        path: '/usermanagement/developmanager',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '운영관리자',
        path: '/usermanagement/systemmanager',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: '작업자',
        path: '/overview/worker',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: '콘텐츠관리',
    path: '/contentmanagement',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'RAW',
        path: '/contentmanagement/raw',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: '스냅생성하기',
        path: '/contentmanagement/createsnap',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'CAPTUREP',
        path: '/contentmanagement/capturep',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'SNAP',
        path: '/contentmanagement/snap',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: '배치관리',
    path: '/batchmanagement',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: '배치상태보기',
        path: '/batchmanagement/batchstatus',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: '임의배치실행',
        path: '/batchmanagement/operatebatchprogram',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'PoclaCorr(공사중)',
    path: '/contented',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'ROI 관리',
        path: '/contented/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
];
