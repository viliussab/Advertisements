import React from 'react';
import { useQuery } from 'react-query';
import campaignQueries from '../../../api/calls/campaignQueries';
import CampaignSummaryQuery from '../../../api/queries/type.CampaignSummaryQuery';
import Campaign from '../../../api/responses/type.Campaign';
import CampaignSummaryWeek from '../../../api/responses/type.CampaignSummaryWeek';
import Filters from '../../../components/public/input/filter';
import dateFns from '../../../config/imports/dateFns';
import dateFunctions from '../../../functions/dateFunctions';

function CampaignSummaryPage() {
  const currentWeek = dateFunctions.getCurrentCampaignDay();
  const from = dateFns.subWeeks(currentWeek, 1);
  const to = dateFns.addWeeks(currentWeek, 4);

  const [query, setQuery] = React.useState<CampaignSummaryQuery>({
    from,
    to,
  });

  const [hoveredCampaignId, setHoveredCampaignId] = React.useState<string>();

  const summaryQuery = useQuery({
    queryKey: [campaignQueries.campaignSummary.key, query],
    queryFn: () => campaignQueries.campaignSummary.fn(query),
  });

  type headerRowProps = {
    name: string;
    renderCell: (c: CampaignSummaryWeek) => React.ReactNode;
  };

  const renderHead = (
    rows: headerRowProps[],
    summaries: CampaignSummaryWeek[],
  ) => {
    return rows.map((row, i) => (
      <tr className={i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
        <th
          className={`py-1 px-2 text-right text-sm uppercase ${
            i % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'
          }`}
        >
          {row.name}
        </th>
        {summaries.map((summary) => (
          <td className="border pl-2 text-center">{row.renderCell(summary)}</td>
        ))}
      </tr>
    ));
  };

  const headerRows = [
    {
      name: 'Savaitė',
      renderCell: (summary) =>
        dateFunctions.formatWeekShort(new Date(summary.week)),
    },
    {
      name: 'Data',
      renderCell: (summary) =>
        dateFunctions.formatWeekPeriodMonths(
          new Date(summary.week),
          dateFns.addWeeks(new Date(summary.week), 1),
        ),
    },
    {
      name: 'Užimtumas',
      renderCell: (summary) => <>{summary.planeOccupancyPercent}%</>,
    },
    {
      name: 'Rezervuota',
      renderCell: (summary) => (
        <div className="flex justify-between gap-2">
          <div>{summary.planesReservedTotalCount} p. </div>
          <div>{summary.reservedTotalPrice.toFixed(1)}€</div>
        </div>
      ),
    },
    {
      name: 'Patvirtinta',
      renderCell: (summary) => (
        <div className="flex justify-between gap-2">
          <div>{summary.planesConfirmedTotalCount} p.</div>
          <div>{summary.confirmedTotalPrice.toFixed(1)}€</div>
        </div>
      ),
    },
    {
      name: 'Viso plokštumų',
      renderCell: (summary) => <div>{summary.planeTotalCount}</div>,
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
    if (campaign.isFulfilled) {
      return 'green';
    }

    return 'gray';
  };

  return (
    <div>
      <div className="sticky m-4 flex justify-center gap-4">
        <Filters.DatePicker
          label="Data nuo"
          onChange={(val) => {
            const toDate = val > query.to ? val : query.to;
            if (val) setQuery((prev) => ({ ...prev, from: val, to: toDate }));
          }}
          value={query.from}
          includeWeekNumber="end"
          datePickerProps={{
            shouldDisableDate: (date) =>
              dateFunctions.getCurrentCampaignDay().getDay() !== date.getDay(),
          }}
        />
        <Filters.DatePicker
          label="Data Iki"
          onChange={(val) => {
            setQuery((prev) => ({ ...prev, to: val }));
          }}
          value={query.to}
          includeWeekNumber="end"
          datePickerProps={{
            minDate: query.from,
            shouldDisableDate: (date) =>
              dateFunctions.getCurrentCampaignDay().getDay() !== date.getDay(),
          }}
        />
      </div>
      <div className="flex justify-center">
        {!summaryQuery.isLoading && (
          <table>
            <thead className="sticky">
              {renderHead(headerRows, summaries)}
            </thead>
            <tbody className="">
              {bodyRowsEnumerate.map((i) => (
                <>
                  <tr>
                    <th className="bg-orange-100 py-1 pl-2 pr-2 text-sm uppercase text-orange-700">
                      Kampanija
                    </th>
                    {summaries.map((summary) =>
                      isThereCampaignInRow(summary.campaigns, i) ? (
                        <td
                          onMouseOver={() =>
                            setHoveredCampaignId(summary.campaigns[i].id)
                          }
                          onMouseLeave={() => setHoveredCampaignId(undefined)}
                          className={`border-collapse border-2 border-b-0 px-1 text-center
                    bg-${getCellColor(summary.campaigns[i])}-100
                    text-${getCellColor(summary.campaigns[i])}-700
                    ${
                      hoveredCampaignId === summary.campaigns[i].id &&
                      'bg-blue-200 text-blue-700'
                    } `}
                        >
                          {summary.campaigns[i].name}
                        </td>
                      ) : (
                        <td></td>
                      ),
                    )}
                  </tr>
                  <tr>
                    <th className="bg-gray-100 py-1 pl-2 pr-2 text-sm uppercase text-gray-700">
                      Plokštumos
                    </th>
                    {summaries.map((summary) =>
                      isThereCampaignInRow(summary.campaigns, i) ? (
                        <td
                          onMouseOver={() =>
                            setHoveredCampaignId(summary.campaigns[i].id)
                          }
                          onMouseLeave={() => setHoveredCampaignId(undefined)}
                          className={`border-collapse border-2 border-t-0 px-1
                    bg-${getCellColor(summary.campaigns[i])}-100
                    text-${getCellColor(summary.campaigns[i])}-700
                    ${
                      hoveredCampaignId === summary.campaigns[i].id &&
                      'bg-blue-200 text-blue-700'
                    } `}
                        >
                          <div className="flex justify-between gap-4">
                            <div>{summary.campaigns[i].planeAmount} p.</div>
                            <div>
                              {summary.campaigns[i].totalNoVat.toFixed(1)}€
                            </div>
                          </div>
                        </td>
                      ) : (
                        <td></td>
                      ),
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CampaignSummaryPage;
