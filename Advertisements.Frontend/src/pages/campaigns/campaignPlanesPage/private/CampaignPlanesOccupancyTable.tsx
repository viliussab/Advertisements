import React from 'react';
import AdvertPlaneOverview from '../../../../api/responses/type.AdvertPlaneOverview';
import PlanePremiumIcon from '../../../../components/private/advert/PlanePremiumIcon';
import { ColumnConfig } from '../../../../components/public/table/Table';
import TableHeaderFilter from '../../../../components/public/table/TableHeaderFilter';

type Props = {
  planes: AdvertPlaneOverview[];
};

export default function CampaignPlanesOccupancyTable(props: Props) {
  const { planes } = props;

  const columns = [
    {
      title: 'Pavadinimas',
      renderCell: (plane) => plane.object.name + ' ' + plane.partialName,
      key: 'planeName',
    },
    {
      title: 'Adresas',
      renderCell: (plane) => plane.object.address,
      key: 'adress',
    },
    {
      title: 'Premium',
      renderCell: (plane) => <PlanePremiumIcon isPremium={plane.isPremium} />,
    },
  ] as ColumnConfig<AdvertPlaneOverview>[];

  return (
    <div className="overflow-scroll">
      <table className="overflow-scroll text-left text-sm text-gray-500">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            {columns.map((c) => (
              <th
                scope="col"
                key={c.title}
                className={`sticky bg-gray-100 py-3 px-6`}
              >
                <div className="flex justify-center text-center align-middle text-sm">
                  {c.title}
                  {c.filter && <TableHeaderFilter {...c.filter} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planes.map((plane) => (
            <tr
              key={plane.id}
              onClick={() => {}}
              className={`nth border-b
            ${'hover:cursor-pointer hover:bg-blue-100'}`}
            >
              {columns.map((c) => (
                <td key={c.key} className="py-1 px-1">
                  <div className="flex items-center justify-center text-center align-middle">
                    {c.renderCell(plane)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
