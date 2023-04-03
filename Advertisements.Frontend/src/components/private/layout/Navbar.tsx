import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import website_paths from '../../../config/website_paths';

type Props = {
  title: string;
};

function Navbar({ title }: Props) {
  return (
    <Mui.AppBar variant="elevation" color="info" position="static">
      <div className="flex items-center justify-start gap-2 p-3">
        <div className="mr-2 h-10">
          <img className="h-full w-full" src="/logo.png" />
        </div>
        <p className="mr-2 ml-2 text-lg font-medium uppercase">{title}</p>

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
              title: 'Objektų sąrašas',
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
          ]}
        />
      </div>
    </Mui.AppBar>
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
                navigate(route.path);
              }}
            >
              <div className="flex w-full justify-between gap-2">
                {route.title}
                <route.Icon />
              </div>
            </Mui.Button>
          ))}
        </div>
      </Mui.Menu>
    </>
  );
}

export default Navbar;
