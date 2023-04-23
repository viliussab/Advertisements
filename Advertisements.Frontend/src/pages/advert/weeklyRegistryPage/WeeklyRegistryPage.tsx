import React from 'react';
import { useQuery } from 'react-query';
import advertQueries from '../../../api/calls/advertQueries';
import filterOptions from '../../../api/filterOptions/filterOptions';
import objectOptions from '../../../api/filterOptions/objectOptions';
import WeeklyRegistryQuery from '../../../api/queries/type.WeeklyRegistryQuery';
import { AdvertPlaneOfSummary } from '../../../api/responses/type.PlaneSummary';
import PlanePremiumIcon from '../../../components/private/advert/PlanePremiumIcon';
import CampaignInfoDialog from '../../../components/private/campaign/CampaignInfoDialog';
import Filters from '../../../components/public/input/filter';
import {
  ColumnConfig,
  TableProps,
} from '../../../components/public/table/Table';
import TableHeaderFilter from '../../../components/public/table/TableHeaderFilter';
import dateFns from '../../../config/imports/dateFns';
import Mui from '../../../config/imports/Mui';
import dateFunctions from '../../../functions/dateFunctions';
import dateStylingFunctions from '../../../functions/dateStylingFunctions';
import optionsFunctions from '../../../functions/optionsFunctions';
import ObjectMapDetailsDialog from '../objectMapPage/private/ObjectMapDetailsDialog';

type PlaneColumnConfig = ColumnConfig<AdvertPlaneOfSummary> & {
  tdWidthClass: string;
};

function WeeklyRegistryPage() {
  const thisYear = new Date(new Date().getFullYear(), 0, 1);
  const thisYearFirstWeek = dateFunctions.getCampaignDay(thisYear);

  const [query, setQuery] = React.useState<WeeklyRegistryQuery>({
    pageNumber: 1,
    pageSize: 25,
    from: thisYearFirstWeek,
  });
  const [objectId, setObjectId] = React.useState<string>();

  const [hoveredCampaignId, setHoveredCampaignId] = React.useState<string>();
  const [selectedCampaignId, setSelectedCampaignId] = React.useState<string>();

  const registryQuery = useQuery({
    queryKey: [advertQueries.weeklySummary.key, query],
    queryFn: () => advertQueries.weeklySummary.fn(query),
  });

  const areasQuery = useQuery({
    queryKey: advertQueries.areas.key,
    queryFn: advertQueries.areas.fn,
  });

  const regions = areasQuery.data?.flatMap((a) => a.regions) || [];

  const columns: PlaneColumnConfig[] = [
    {
      title: 'Pavadinimas',
      renderCell: (plane) => <>{`${plane.object.name} ${plane.partialName}`}</>,
      tdWidthClass: 'w-32',
      key: 'name',
      filter: {
        isActive: !!query.name,
        renderFilter: () => (
          <Filters.Search
            label="Pavadinimas"
            value={query.name}
            onChange={(value) => setQuery((prev) => ({ ...prev, name: value }))}
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, name: undefined }));
        },
      },
    },
    {
      title: 'Adresas',
      renderCell: (plane) => <>{plane.object.address}</>,
      key: 'address',
      tdWidthClass: 'w-32',
      filter: {
        isActive: !!query.address,
        renderFilter: () => (
          <Filters.Search
            label="Adresas"
            value={query.address}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, address: value }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, address: undefined }));
        },
      },
    },
    {
      title: 'Pusė',
      renderCell: (plane) => <>{plane.partialName}</>,
      key: 'side',
      tdWidthClass: 'text-center',
      filter: {
        isActive: !!query.side,
        renderFilter: () => (
          <Filters.Select
            options={objectOptions.sideOptions}
            label="Pusė"
            value={query.side}
            onChange={(value) => setQuery((prev) => ({ ...prev, side: value }))}
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, side: undefined }));
        },
      },
    },
    {
      title: 'Rajonas',
      renderCell: (plane) => <>{plane.object.region}</>,
      key: 'region',
      filter: {
        isActive: !!query.region,
        renderFilter: () => (
          <Filters.Select
            options={optionsFunctions.getArrayOptions(regions)}
            label="Rajonas"
            value={query.region}
            onChange={(value) =>
              setQuery((prev) => ({ ...prev, region: value }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, region: undefined }));
        },
      },
      tdWidthClass: '',
    },
    {
      tdWidthClass: 'text-center',
      title: 'Premium',
      renderCell: (plane) => <PlanePremiumIcon isPremium={plane.isPremium} />,
      key: 'premium',
      filter: {
        isActive: !!query.premium?.toString(),
        renderFilter: () => (
          <Filters.Select
            emptyOptionDisplay="Visi"
            options={objectOptions.premiumOptions}
            label="Premium"
            value={query.premium?.toString()}
            onChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                premium: filterOptions.toBoolean(value),
              }))
            }
          />
        ),
        onFilterRemove: () => {
          setQuery((prev) => ({ ...prev, premium: undefined }));
        },
      },
    },
  ];

  return (
    <div>
      <div className="sticky m-4 flex justify-center gap-4">
        <Filters.DatePicker
          label="Data nuo"
          onChange={(val) => {
            if (val) setQuery((prev) => ({ ...prev, from: val }));
          }}
          value={query.from}
          includeWeekNumber="end"
          datePickerProps={{
            shouldDisableDate: (date) =>
              dateFunctions.getCurrentCampaignDay().getDay() !== date.getDay(),
          }}
        />
      </div>
      <WeeklyRegistryTable
        hoveredCampaignId={hoveredCampaignId}
        onCampaignHover={(id) => setHoveredCampaignId(id)}
        onCampaignClick={(id) => setSelectedCampaignId(id)}
        columns={columns}
        data={registryQuery.data?.items || []}
        paging={{
          pageSize: query.pageSize,
          pageNumber: query.pageNumber,
          totalCount: registryQuery.data?.totalCount || 0,
          setPageNumber: (pageNumber) =>
            setQuery((prev) => ({
              ...prev,
              pageNumber,
            })),
          setPageSize(pageSize) {
            setQuery((prev) => ({
              ...prev,
              pageSize,
            }));
          },
        }}
        keySelector={(x) => x.id}
        weeks={(registryQuery.data?.weeks || []).map((x) => new Date(x))}
        onClick={(x) => {
          setObjectId(x.objectId);
        }}
        renderOnClickMenu={() => <></>}
      />
      <ObjectMapDetailsDialog
        selectedObjectId={objectId}
        resetSelectedId={() => setObjectId(undefined)}
      />
      <CampaignInfoDialog
        selectedCampaignId={selectedCampaignId}
        resetSelectedId={() => {
          setHoveredCampaignId(undefined);
          setSelectedCampaignId(undefined);
        }}
      />
    </div>
  );
}

type WeeklyRegistryTableProps = TableProps<AdvertPlaneOfSummary> & {
  columns: PlaneColumnConfig[];
  weeks: Date[];
  hoveredCampaignId: string | undefined;
  onCampaignHover: (id: string | undefined) => void;
  onCampaignClick: (id: string | undefined) => void;
};

function WeeklyRegistryTable(props: WeeklyRegistryTableProps) {
  const { columns, data, keySelector, paging, rowsProps, onClick, weeks } =
    props;

  return (
    <div className="mr-4 ml-4 mb-4 overflow-x-scroll">
      <table className="text-left text-sm text-gray-500">
        <thead className="text-black">
          <tr>
            <td colSpan={columns.length} className="">
              {paging && (
                <Mui.TablePagination
                  component="div"
                  count={paging.totalCount}
                  page={paging.pageNumber - 1}
                  onPageChange={(_, pageNumber) =>
                    paging.setPageNumber(pageNumber + 1)
                  }
                  rowsPerPage={paging.pageSize}
                  onRowsPerPageChange={(event) =>
                    paging.setPageSize(Number(event.target.value))
                  }
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} iš ${count}`
                  }
                  labelRowsPerPage="Puslapio dydis: "
                />
              )}
            </td>
            {weeks.map((week, i) => (
              <td
                className={`h-7 min-w-[120px] border pl-2 text-center text-sm font-bold uppercase ${
                  dateStylingFunctions.getMonthCss(week).strong
                }`}
              >
                {dateStylingFunctions.getMonthText(week, i)}
              </td>
            ))}
          </tr>
          <tr className="">
            {columns.map((c) => (
              <th
                scope="col"
                key={c.title}
                className={`sticky bg-gray-100 py-1 px-2 text-xs uppercase text-gray-700`}
              >
                <div className="flex items-center justify-center text-center ">
                  {c.title}
                  {c.filter && <TableHeaderFilter {...c.filter} />}
                </div>
              </th>
            ))}
            {weeks.map((week) => (
              <td
                className={`min-w-[120px] border pl-2 text-center ${
                  dateStylingFunctions.getMonthCss(week).weak
                }`}
              >
                <div className="font-bold">
                  {dateFunctions.formatWeekShort(week)}
                </div>
                <div className="text-sm">
                  {dateFunctions.formatWeekPeriodMonths(
                    week,
                    dateFns.addWeeks(week, 1),
                  )}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => (
            <WeeklyRegistryRow
              columns={columns}
              key={keySelector(elem)}
              elem={elem}
              onClick={onClick}
              rowsProps={rowsProps}
              weeks={weeks}
              hoveredCampaignId={props.hoveredCampaignId}
              onCampaignHover={props.onCampaignHover}
              onCampaignClick={props.onCampaignClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

type WeeklyRegistryRowProps = {
  columns: PlaneColumnConfig[];
  rowsProps?: {
    onMouseOver?: (elem: AdvertPlaneOfSummary) => void;
    onMouseOut?: (elem: AdvertPlaneOfSummary) => void;
  };
  onClick?: (elem: AdvertPlaneOfSummary) => void;
  elem: AdvertPlaneOfSummary;
  weeks: Date[];
  hoveredCampaignId: string | undefined;
  onCampaignHover: (id: string | undefined) => void;
  onCampaignClick: (id: string | undefined) => void;
};

export function WeeklyRegistryRow(props: WeeklyRegistryRowProps) {
  const {
    rowsProps,
    elem,
    onClick,
    columns,
    weeks,
    hoveredCampaignId,
    onCampaignHover,
    onCampaignClick,
  } = props;

  const [rowHovered, setRowHovered] = React.useState(false);

  const getCampaign = (week: Date) =>
    elem.occupyingCampaigns.find(
      (x) => new Date(x.week).getTime() === week.getTime(),
    );

  return (
    <>
      <tr
        className={`${
          onClick && rowHovered && 'cursor-pointer hover:bg-blue-100'
        }`}
      >
        {columns.map((c) => (
          <td
            onMouseOver={() => setRowHovered(true)}
            onMouseOut={() => setRowHovered(false)}
            onClick={() => {
              onClick && onClick(elem);
            }}
            className={`nth border-b ${c.tdWidthClass}`}
            key={c.key}
          >
            <div
              className={`${c.tdWidthClass} items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap align-middle`}
            >
              {c.renderCell(elem)}
            </div>
          </td>
        ))}
        {weeks.map((week) =>
          getCampaign(week) ? (
            <td
              className={`cursor-pointer border text-center text-black ${
                getCampaign(week)?.id === hoveredCampaignId
                  ? 'bg-blue-300'
                  : 'bg-green-200'
              }`}
              onMouseOver={() => onCampaignHover(getCampaign(week)?.id)}
              onMouseOut={() => onCampaignHover(undefined)}
              onClick={() => onCampaignClick(getCampaign(week)?.id)}
            >
              {getCampaign(week)?.name}
            </td>
          ) : (
            <td className="bg-gray-50 hover:bg-gray-200"></td>
          ),
        )}
      </tr>
    </>
  );
}

export default WeeklyRegistryPage;
