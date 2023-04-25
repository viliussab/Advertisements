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
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';
import dateFunctions from '../../../functions/dateFunctions';
import dateStylingFunctions from '../../../functions/dateStylingFunctions';
import optionsFunctions from '../../../functions/optionsFunctions';
import ObjectMapDetailsDialog from '../objectMapPage/private/ObjectMapDetailsDialog';
import _ from 'lodash';

type PlaneColumnConfig = ColumnConfig<AdvertPlaneOfSummary> & {
  rowWidthPx: number;
};

function WeeklyRegistryPage() {
  const thisYear = new Date(new Date().getFullYear(), 0, 1);
  const thisYearFirstWeek = dateFunctions.getCampaignDay(thisYear);

  const [query, setQuery] = React.useState<WeeklyRegistryQuery>({
    pageNumber: 1,
    pageSize: 1000,
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
      title: 'Nr.',
      renderCell: (plane) => <>{`${plane.object.serialCode}`}</>,
      key: 'number',
      rowWidthPx: 40,
    },
    {
      title: 'Pavadinimas',
      renderCell: (plane) => <>{`${plane.object.name} ${plane.partialName}`}</>,
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
      rowWidthPx: 128,
    },
    {
      title: 'Adresas',
      renderCell: (plane) => <>{plane.object.address}</>,
      key: 'address',
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
      rowWidthPx: 96,
    },
    {
      title: 'Pusė',
      renderCell: (plane) => <>{plane.partialName}</>,
      key: 'side',
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
      rowWidthPx: 64,
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
      rowWidthPx: 96,
    },
    {
      title: (
        <>
          <Icons.Star />
        </>
      ),
      renderCell: (plane) => (
        <>
          <PlanePremiumIcon isPremium={plane.isPremium} />
        </>
      ),
      key: 'premium',
      filter: {
        isActive: !!query.premium,
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
      rowWidthPx: 80,
    },
  ];

  return (
    <div>
      <div className="white fixed top-16 z-10 h-[88px] w-full bg-white"></div>
      <div className="z-20 m-4 mb-16 flex justify-center gap-4 bg-white">
        <div className="fixed z-20 flex-1 bg-white">
          <Filters.DatePicker
            label="Data nuo"
            onChange={(val) => {
              if (val) setQuery((prev) => ({ ...prev, from: val }));
            }}
            value={query.from}
            includeWeekNumber="end"
            datePickerProps={{
              shouldDisableDate: (date) =>
                dateFunctions.getCurrentCampaignDay().getDay() !==
                date.getDay(),
            }}
          />
        </div>
      </div>
      <RegistryTable
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

type RegistryTableProps = {
  columns: PlaneColumnConfig[];
  data: AdvertPlaneOfSummary[];
  onClick?: (elem: AdvertPlaneOfSummary) => void;
  renderOnClickMenu?: (elem: AdvertPlaneOfSummary) => React.ReactNode;
  rowsProps?: {
    onMouseOver?: (elem: AdvertPlaneOfSummary) => void;
    onMouseOut?: (elem: AdvertPlaneOfSummary) => void;
  };
  keySelector: (elem: AdvertPlaneOfSummary) => string;
  paging?: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
  };
  weeks: Date[];
  hoveredCampaignId: string | undefined;
  onCampaignHover: (id: string | undefined) => void;
  onCampaignClick: (id: string | undefined) => void;
};

function RegistryTable(props: RegistryTableProps) {
  const {
    columns,
    data,
    paging,
    onClick,
    weeks,
    hoveredCampaignId,
    onCampaignClick,
    onCampaignHover,
  } = props;

  const width = columns.reduce((sum, col) => sum + col.rowWidthPx, 0);

  const initialLeft = width + 16;

  const [left, setLeft] = React.useState<number>(initialLeft);

  const getCampaign = (elem: AdvertPlaneOfSummary, week: Date) =>
    elem.occupyingCampaigns.find(
      (x) => new Date(x.week).getTime() === week.getTime(),
    );

  const onScroll = React.useCallback(
    _.debounce((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      //@ts-ignore
      setLeft(initialLeft + -event.target.scrollLeft);
    }, 0),
    [],
  );

  return (
    <>
      <div className="fixed z-30 h-[100vh] w-4 bg-white"></div>
      <div className="ml-4 mb-4">
        <div className="relative flex overflow-y-hidden">
          <div className={`w-[${width}px]`}>
            <div className={`fixed z-10`}>
              <div className="h-14 bg-white">
                {paging && (
                  <Mui.TablePagination
                    component="div"
                    count={paging.totalCount}
                    page={paging.pageNumber - 1}
                    onPageChange={(_, pageNumber) =>
                      paging.setPageNumber(pageNumber + 1)
                    }
                    rowsPerPageOptions={[100, 500, 1000]}
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
              </div>
              <div className="z-20 flex h-12 ">
                {columns.map((c) => (
                  <div key={c.key} style={{ width: c.rowWidthPx }}>
                    <div
                      className={`z-20 flex h-12 items-center justify-center border-r bg-gray-100 text-center text-xs font-bold uppercase text-black`}
                    >
                      {c.title}
                      {c.filter && <TableHeaderFilter {...c.filter} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-[120px] bg-white">
              {data.map((elem) => (
                <div
                  className="flex cursor-pointer hover:bg-blue-100"
                  key={elem.id}
                >
                  {columns.map((c) => (
                    <div
                      style={{ width: c.rowWidthPx }}
                      onClick={() => {
                        onClick && onClick(elem);
                      }}
                      className={`nth h-6 items-center justify-center border-t pl-1 pr-1 text-sm text-gray-700`}
                      key={c.key}
                    >
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-center">
                        {c.renderCell(elem)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-y-hidden">
            <div className={`fixed`} style={{ left: left }}>
              <div className="flex h-14">
                {weeks.map((week, i) => (
                  <div
                    key={week.getTime()}
                    className={`flex min-w-[120px] items-center justify-center border text-sm font-bold uppercase ${
                      dateStylingFunctions.getMonthCss(week).strong
                    }`}
                  >
                    <div className="">
                      {dateStylingFunctions.getMonthText(week, i)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex h-12">
                {weeks.map((week) => (
                  <div
                    key={week.getTime()}
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
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`overflow-x-hidden" fixed mt-[80px] overflow-y-hidden`}
              style={{
                maxWidth: `calc(100vw - ${initialLeft}px)`,
              }}
              onScroll={(e) => onScroll(e)}
            >
              <div style={{ width: weeks.length * 120 }}>&nbsp;</div>
            </div>
            <div>
              <div
                className={`mt-[120px] overflow-hidden`}
                style={{
                  marginLeft: left - initialLeft,
                }}
              >
                {data.map((elem) => (
                  <div className="flex" key={elem.id}>
                    {weeks.map((week) => (
                      <div className="h-6 w-[120px]" key={week.getTime()}>
                        {getCampaign(elem, week) ? (
                          <div
                            style={{ width: 120 }}
                            className={`h-6 w-[120px] cursor-pointer border text-center text-black ${
                              getCampaign(elem, week)?.id === hoveredCampaignId
                                ? 'bg-blue-300'
                                : 'bg-green-200'
                            }`}
                            onMouseOver={() =>
                              onCampaignHover(getCampaign(elem, week)?.id)
                            }
                            onMouseOut={() => onCampaignHover(undefined)}
                            onClick={() =>
                              onCampaignClick(getCampaign(elem, week)?.id)
                            }
                          >
                            {getCampaign(elem, week)?.name}
                          </div>
                        ) : (
                          <div className="h-6 w-[120px] bg-gray-50 hover:bg-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeeklyRegistryPage;
