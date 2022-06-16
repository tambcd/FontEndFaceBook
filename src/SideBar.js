import React from 'react'
import './css/Sidebar.css';
import SideBarOption from './SideBarOption';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStateValue } from './StateProvider';



function SideBar() {
  const [{user},dispatch] = useStateValue();


  return (
    <div className='sidebar'>
         <SideBarOption title={user.displayName}src={user.photoURL} />

        <SideBarOption title="Bạn bè" src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png" />
        <SideBarOption title="Kỉ niệm" src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/AYj2837MmgX.png" />
        <SideBarOption title="Marketplace" src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/9BDqQflVfXI.png" />
        <SideBarOption title="Chiến dịch gây quỹ" src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/A2tHTy6ibgT.png" />
        <SideBarOption title="Chơi game" src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/XEWvxf1LQAG.png" />
        <SideBarOption title="Hiến máu" src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/K4SvMBrrneO.png" />
        <SideBarOption title="Xem thêm" Icon={ExpandMoreIcon}/>

        


    </div>

  )
}

export default SideBar