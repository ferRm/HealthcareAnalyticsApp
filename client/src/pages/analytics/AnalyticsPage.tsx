import {
  useAnalyticsQuery,
  BarChart,
  AreaChart,
  LineChart,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@databricks/appkit-ui/react';

export function AnalyticsPage() {
  const { data: facilityStats, loading: statsLoading } = useAnalyticsQuery('facility_stats');
  const { data: districtHealth, loading: healthLoading } = useAnalyticsQuery('district_health_summary');

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Healthcare Analytics Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Insights from India healthcare facilities and district health indicators
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-l-4 border-l-[#FF3621]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold text-[#FF3621]">
                {facilityStats?.[0]?.total_facilities?.toLocaleString() || '—'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-[#0B2026]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">States Covered</CardTitle>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold text-[#0B2026]">
                {districtHealth?.[0]?.total_states || '—'}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Health Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold text-green-600">
                {districtHealth?.[0]?.avg_health_insurance || '—'}%
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Sanitation Access</CardTitle>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold text-blue-600">
                {districtHealth?.[0]?.avg_sanitation || '—'}%
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Facilities by State (Top 15)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart queryKey="facilities_by_state" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Health Insurance Coverage by State</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart queryKey="health_indicators_by_state" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sanitation Access by State</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart queryKey="health_indicators_by_state" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Healthcare Infrastructure Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart queryKey="health_indicators_by_state" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
