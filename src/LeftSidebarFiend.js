import React from 'react'
import './css/LeftSidebarFriend.css';
import SideBarOption from './SideBarOption';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RedeemIcon from '@mui/icons-material/Redeem';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function LeftSidebarFiend() {
  return (
    <div className='sidebar'>

        <SideBarOption title="Trang chủ" Icon={GroupIcon} />
        <SideBarOption title="Lời mời kết bạn" Icon={PersonAddIcon} />
        <SideBarOption title="Gợi ý" Icon={GroupAddIcon} />
        <SideBarOption title="Tất cả bạn bè" Icon={PeopleOutlineIcon} />
        <SideBarOption title="Sinh Nhật" Icon={RedeemIcon} />       


    </div>
  )
}

export default LeftSidebarFiend