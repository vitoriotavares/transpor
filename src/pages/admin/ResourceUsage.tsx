import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Definir tipos para os dados
interface ApiUsageData {
  name: string;
  transcription: number;
  translation: number;
  cost: number;
}

interface LanguageData {
  name: string;
  value: number;
}

interface StorageData {
  name: string;
  usage: number;
  cost: number;
}

interface PerformanceData {
  name: string;
  responseTime: number;
  errorRate: number;
}

// Mock data for API usage
const apiUsageData: ApiUsageData[] = [
  { name: 'Jan', transcription: 1200, translation: 450, cost: 2300 },
  { name: 'Feb', transcription: 1350, translation: 520, cost: 2600 },
  { name: 'Mar', transcription: 1460, translation: 590, cost: 2850 },
  { name: 'Apr', transcription: 1600, translation: 620, cost: 3100 },
  { name: 'May', transcription: 1750, translation: 700, cost: 3400 },
  { name: 'Jun', transcription: 1850, translation: 750, cost: 3600 },
];

// Mock data for language distribution
const languageData: LanguageData[] = [
  { name: 'English', value: 45 },
  { name: 'Spanish', value: 20 },
  { name: 'Portuguese', value: 15 },
  { name: 'French', value: 10 },
  { name: 'German', value: 5 },
  { name: 'Other', value: 5 },
];

// Mock data for storage usage
const storageData: StorageData[] = [
  { name: 'Jan', usage: 120, cost: 6 },
  { name: 'Feb', usage: 150, cost: 7.5 },
  { name: 'Mar', usage: 180, cost: 9 },
  { name: 'Apr', usage: 210, cost: 10.5 },
  { name: 'May', usage: 250, cost: 12.5 },
  { name: 'Jun', usage: 290, cost: 14.5 },
];

// Mock data for system performance
const performanceData: PerformanceData[] = [
  { name: 'Jan', responseTime: 320, errorRate: 1.2 },
  { name: 'Feb', responseTime: 340, errorRate: 1.5 },
  { name: 'Mar', responseTime: 310, errorRate: 1.1 },
  { name: 'Apr', responseTime: 290, errorRate: 0.9 },
  { name: 'May', responseTime: 280, errorRate: 0.8 },
  { name: 'Jun', responseTime: 270, errorRate: 0.7 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Interface para o label do gráfico de pizza
interface PieChartLabelProps {
  name: string;
  percent: number;
}

const ResourceUsage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Resource Usage Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === '7d' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            7 days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === '30d' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            30 days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === '90d' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            90 days
          </button>
          <button
            onClick={() => setTimeRange('1y')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === '1y' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            1 year
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transcription Hours</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">1,850</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              +5.7%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">120 hours more than last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Translation Hours</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">750</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              +6.7%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">50 hours more than last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">API Costs</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">$3,600</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              +5.9%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">$200 more than last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Storage Used</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">290 GB</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              +16%
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-4">40 GB more than last month</p>
        </div>
      </div>
      
      {/* API Usage Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">API Usage & Costs</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={apiUsageData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="transcription" name="Transcription (hours)" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="translation" name="Translation (hours)" fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="cost" name="Cost ($)" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Language Distribution and Storage Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Translation Language Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: PieChartLabelProps) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {languageData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Storage Usage & Costs</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={storageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="usage" name="Storage (GB)" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="cost" name="Cost ($)" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* System Performance */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">System Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="responseTime" name="Avg. Response Time (ms)" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="errorRate" name="Error Rate (%)" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Resource Usage by User */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Top Users by Resource Consumption</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transcription
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Translation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Smith</div>
                      <div className="text-sm text-gray-500">john.smith@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Enterprise
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  85.2 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  42.5 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  18.5 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $245.80
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/2.jpg" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">sarah.johnson@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Pro
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  62.8 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  31.4 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12.2 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $178.50
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Michael Brown</div>
                      <div className="text-sm text-gray-500">michael.brown@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Pro
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  58.1 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  29.5 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10.8 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $165.20
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/4.jpg" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Emily Davis</div>
                      <div className="text-sm text-gray-500">emily.davis@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Basic
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  42.3 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  18.7 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7.5 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $112.40
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/5.jpg" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">David Wilson</div>
                      <div className="text-sm text-gray-500">david.wilson@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Basic
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  38.9 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15.2 hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  6.8 GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  $98.70
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceUsage;
