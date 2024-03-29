import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';
import { UserContext } from '../../../providers/AuthenticationProvider';

type Props = {
  title: string;
};

function Navbar({ title }: Props) {
  const user = useContext(UserContext);

  return (
    <>
      <div className="h-16"></div>
      <Mui.AppBar variant="elevation" color="info" position="fixed">
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-2 p-3">
            <div className="mr-2 h-10">
              <img className="h-full w-full" src="/logo.png" />
            </div>
            <p className="ml-2 mr-2 text-lg  uppercase italic">{title}</p>

            <Mui.Divider orientation="vertical" flexItem />

            <NavbarRouteButton
              renderCell={() => <>Objektai</>}
              routes={[
                {
                  path: website_paths.objects.create,
                  title: 'Kurti objektą',
                  Icon: Icons.Add,
                },
                {
                  path: website_paths.objects.main,
                  title: 'Plokštumų sąrašas',
                  Icon: Icons.List,
                },
                {
                  path: website_paths.objects.map,
                  title: 'Objektų žemėlapis',
                  Icon: Icons.Map,
                },
              ]}
            />
            <NavbarRouteButton
              renderCell={() => <>Kampanijos</>}
              routes={[
                {
                  path: website_paths.campaigns.create,
                  title: 'Kurti reklamos pasiūlymą',
                  Icon: Icons.Add,
                },
                {
                  path: website_paths.campaigns.main,
                  title: 'Kampanijų sąrašas',
                  Icon: Icons.List,
                },
                {
                  path: website_paths.campaigns.weekly_overview,
                  title: 'Kampanijų suvestinė',
                  Icon: Icons.TableRows,
                },
                {
                  path: website_paths.adverts.weekly_occupancy,
                  title: 'Savaitinis registras',
                  Icon: Icons.LocationOn,
                },
                {
                  path: website_paths.customers.main,
                  title: 'Valdyti klientus',
                  Icon: Icons.People,
                },
              ]}
            />
          </div>
          <div className="flex items-center justify-center p-4">
            <Mui.Button color="secondary" onClick={user.logoutAsync}>
              Atsijungti
              <Icons.Logout sx={{ ml: 2 }} />
            </Mui.Button>
          </div>
        </div>
      </Mui.AppBar>
    </>
  );
}

type NavbarRoutesButtonProps = {
  renderCell: () => React.ReactElement;
  routes: {
    title: string;
    path: string;
    Icon: React.ComponentType<Mui.SvgIconProps>;
  }[];
};

function NavbarRouteButton({ renderCell, routes }: NavbarRoutesButtonProps) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <Mui.Button
        color="secondary"
        onClick={(event) => {
          setMenuAnchor(event.currentTarget);
        }}
      >
        {renderCell()}
        {menuAnchor ? <Icons.ArrowDropUp /> : <Icons.ArrowDropDown />}
      </Mui.Button>
      <Mui.Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <div className="flex flex-col">
          {routes.map((route) => (
            <Mui.Button
              key={route.path}
              color="info"
              onClick={() => {
                setMenuAnchor(null);
                // navigate(route.path);
              }}
            >
              <a href={route.path} className="w-full">
                <div className="flex w-full justify-between gap-2">
                  {route.title}
                  <route.Icon />
                </div>
              </a>
            </Mui.Button>
          ))}
        </div>
      </Mui.Menu>
    </>
  );
}

export default Navbar;
