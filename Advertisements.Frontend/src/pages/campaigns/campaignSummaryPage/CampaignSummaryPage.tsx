import React from 'react';
import { useQuery } from 'react-query';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignSummaryQuery from '../../../api/queries/type.CampaignSummaryQuery';
import Campaign from '../../../api/responses/type.Campaign';
import CampaignSummaryWeek from '../../../api/responses/type.CampaignSummaryWeek';
import CampaignInfoDialog from '../../../components/private/campaign/CampaignInfoDialog';
import Filters from '../../../components/public/input/filter';
import constants from '../../../config/constants';
import dateFns from '../../../config/imports/dateFns';
import dateFunctions, { weekDay } from '../../../functions/dateFunctions';
import dateStylingFunctions from '../../../functions/dateStylingFunctions';

function CampaignSummaryPage() {
  const thisYear = new Date(new Date().getFullYear(), 0, 1);

  const thisYearFirstWeek = dateFunctions.getCampaignDay(thisYear);

  const [query, setQuery] = React.useState<CampaignSummaryQuery>({
    from: thisYearFirstWeek,
  });

  const [hoveredCampaignId, setHoveredCampaignId] = React.useState<string>();
  const [selectedCampaignId, setSelectedCampaignId] = React.useState<string>();

  const summaryQuery = useQuery({
    queryKey: [campaignQueries.campaignSummary.key, query],
    queryFn: () => campaignQueries.campaignSummary.fn(query),
  });

  type headerRowProps = {
    name: string;
    renderCell: (c: CampaignSummaryWeek) => React.ReactNode;
    tdClassName?: string;
  };

  const renderSupportingRows = (
    rows: headerRowProps[],
    summaries: CampaignSummaryWeek[],
  ) => {
    return rows.map((row, i) => (
      <tr className={i % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}>
        <th
          className={`absolute z-10 w-32 px-2 py-1 text-center text-sm uppercase ${
            i % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'
          } `}
        >
          {row.name}
        </th>
        {summaries.map((summary) => (
          <td
            className={`text-center" + min-w-[120px] border pl-2 ${row.tdClassName}`}
          >
            {row.renderCell(summary)}
          </td>
        ))}
      </tr>
    ));
  };

  const supportingRows = [
    {
      name: 'Užimtumas',
      renderCell: (summary) => <>{summary.planeOccupancyPercent}%</>,
      tdClassName: 'font-bold',
    },
    {
      name: 'Patvirtinta',
      renderCell: (summary) => (
        <div>{summary.confirmedTotalPrice.toFixed(1)}€</div>
      ),
    },
    {
      name: 'Viso laisvų',
      renderCell: (summary) => <div>{summary.planeFreeTotalCount}</div>,
    },
  ] as headerRowProps[];

  const isThereCampaignInRow = (campaigns: Campaign[], i: number) => {
    const campaign = campaigns[i];

    return !!campaign;
  };

  const summaries = summaryQuery.data || [];
  const maxRowCount = Math.max(...summaries.map((x) => x.campaigns?.length));
  const bodyRowsEnumerate = summaries.length
    ? Array.from(new Array(maxRowCount), (_, i) => i)
    : [];

  const getCellColor = (campaign: Campaign) => {
    if (hoveredCampaignId === campaign.id) {
      return 'bg-blue-200 text-blue-900';
    }

    if (campaign.isFulfilled) {
      return 'bg-green-200 text-green-900';
    }

    return 'bg-gray-100 text-gray-900';
  };

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
      <div className="ml-4 mr-4 overflow-x-scroll">
        {!summaryQuery.isLoading && (
          <table className="table-fixed">
            <thead className="">
              {renderSupportingRows(supportingRows, summaries)}
              <tr>
                <th className="h-6 pl-16 pr-16"></th>
              </tr>
              <tr>
                <th
                  className={`absolute z-10 w-32 px-2 py-1 text-center text-sm uppercase ${'bg-gray-300'}`}
                >
                  Menėsis
                </th>
                {summaries.map((summary, i) => (
                  <td
                    className={`h-7 border pl-2 text-center text-xs font-bold uppercase ${
                      dateStylingFunctions.getMonthCss(new Date(summary.week))
                        .strong
                    }`}
                  >
                    {dateStylingFunctions.getMonthText(
                      new Date(summary.week),
                      i,
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <th
                  className={` absolute z-10 w-32 px-2 py-1 pb-[0.70rem] pt-3 text-center text-sm uppercase ${'bg-gray-200'}`}
                >
                  Savaitė
                </th>
                {summaries.map((summary) => (
                  <td
                    className={`min-w-[120px] border pl-2 text-center ${
                      dateStylingFunctions.getMonthCss(new Date(summary.week))
                        .weak
                    }`}
                  >
                    <div className="text-sm font-bold uppercase">
                      {dateFunctions.formatWeekShort(new Date(summary.week))}
                    </div>
                    <div className="text-sm">
                      {dateFunctions.formatWeekPeriodMonths(
                        new Date(summary.week),
                        dateFns.addWeeks(new Date(summary.week), 1),
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="h-3 pl-16 pr-16"></th>
              </tr>
            </thead>
            <tbody className="">
              {bodyRowsEnumerate.map((i) => (
                <>
                  <tr>
                    <th className="absolute z-10 w-32   text-sm uppercase ">
                      <div className="bg-orange-100 py-1 pl-2 pr-2 text-orange-700">
                        Kampanija
                      </div>
                      <div className="bg-gray-100 py-1 pl-2 pr-2 text-gray-700">
                        Plokštumos
                      </div>
                    </th>
                    {summaries.map((summary) =>
                      isThereCampaignInRow(summary.campaigns, i) ? (
                        <td
                          onMouseOver={() =>
                            setHoveredCampaignId(summary.campaigns[i].id)
                          }
                          onMouseLeave={() => setHoveredCampaignId(undefined)}
                          onClick={() =>
                            setSelectedCampaignId(summary.campaigns[i].id)
                          }
                          className={`border-collapse cursor-pointer border px-1 text-center
                          ${getCellColor(summary.campaigns[i])}`}
                        >
                          <div className="">
                            <table>
                              <tr className="">
                                <td colSpan={2}>
                                  <div className="block w-32 overflow-hidden text-ellipsis whitespace-nowrap text-center uppercase">
                                    {summary.campaigns[i].name}
                                  </div>
                                </td>
                              </tr>
                              <tr className="">
                                <td className="w-8 text-left font-bold">
                                  <div className="ml-4">
                                    {summary.campaigns[i].planeAmount}
                                  </div>
                                </td>
                                <td className="mr-2 w-24 text-right">
                                  <div className="mr-4">
                                    {summary.campaigns[i].weeklyPrice.toFixed(
                                      1,
                                    )}
                                    €
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="w-32"></div>
                        </td>
                      ),
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CampaignInfoDialog
        onConfirm={() => summaryQuery.refetch()}
        selectedCampaignId={selectedCampaignId}
        resetSelectedId={() => {
          setHoveredCampaignId(undefined);
          setSelectedCampaignId(undefined);
        }}
      />
    </div>
  );
}

export default CampaignSummaryPage;
