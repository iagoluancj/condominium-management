import { BiHome, BiMenu, BiNotification } from 'react-icons/bi'
import { CloseMenu, Icons, IconsContainer, IconsMenu, IconsRight, MenuContainer, MenuDiv, NavContainer, NavIconMenu, Navigation, NavMenu } from './styles'
import { GrNotification, GrUser } from 'react-icons/gr'
import { GiProtectionGlasses } from 'react-icons/gi'
import { FiEdit } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { SupaContext } from '@/Context/context'

export default function NavBar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { handleChangePage } = useContext(SupaContext);

    const handleMenu = () => {
        if (toggleMenu) {
            setToggleMenu(false)
        } else {
            setToggleMenu(true)
        }
    }

    return (
        <>
            <Navigation>
                <NavContainer>
                    <Icons onClick={handleMenu}>
                        <BiMenu size={30} />
                    </Icons>
                    <IconsRight>
                        <Icons><GrNotification size={25} /></Icons>
                        <Icons><GrUser size={25} /></Icons>
                    </IconsRight>
                </NavContainer>
            </Navigation>

            {toggleMenu ?
                <MenuDiv>
                    <NavMenu>
                        <NavIconMenu>
                            <GiProtectionGlasses size={70} />
                            <span>Condominium Management</span>
                        </NavIconMenu>
                    </NavMenu>
                    <MenuContainer>
                        <IconsContainer>
                            <IconsMenu onClick={handleChangePage}>
                                <BiHome size={30} />
                                <p>Home</p>
                            </IconsMenu>
                            <IconsMenu onClick={handleChangePage}>
                                <FiEdit size={28} />
                                <p>Inquilinos</p>
                            </IconsMenu>
                        </IconsContainer>
                    </MenuContainer>
                    <CloseMenu onClick={handleMenu}>
                        <IconsMenu>
                            <div>
                                <IoClose size={28} />
                                <span>Fechar menu</span>
                            </div>
                        </IconsMenu>
                    </CloseMenu>
                </MenuDiv>
                :
                <span></span>
            }
        </>
    )
}
