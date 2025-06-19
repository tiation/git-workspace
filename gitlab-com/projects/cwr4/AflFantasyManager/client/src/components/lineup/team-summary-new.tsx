import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, Info, Award, BarChart2, ArrowRight, ArrowRightLeft, Brain } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatScore, getPositionColor } from "@/lib/utils";

type TeamPlayer = {
  id: number;
  name: string;
  position: string;
  team?: string;
  isCaptain?: boolean;
  price?: number;
  breakEven?: number;
  lastScore?: number;
  averagePoints?: number;
  liveScore?: number;
  secondaryPositions?: string[];
  isOnBench?: boolean;
  projScore?: number;
};

// Create placeholder players when not enough actual players are available
const getPlaceholders = (position: string, count: number, startId: number) => {
  return Array(count).fill(null).map((_, i) => ({
    id: startId + i,
    name: `Player ${String.fromCharCode(65 + i)}`,
    position,
    team: "TBD",
    price: 500000,
    breakEven: 80,
    lastScore: 70,
    averagePoints: 75,
    liveScore: 0,
    isOnBench: false
  }));
};

type PositionSectionProps = {
  title: string;
  shortCode: string;
  fieldPlayers: TeamPlayer[];
  benchPlayers: TeamPlayer[];
  requiredFieldCount: number;
  requiredBenchCount: number;
  color: string;
  hasBorder?: boolean;
};

const PositionSection = ({ 
  title, 
  shortCode, 
  fieldPlayers, 
  benchPlayers, 
  requiredFieldCount,
  requiredBenchCount,
  color,
  hasBorder = true
}: PositionSectionProps) => {
  const [expanded, setExpanded] = useState(true);
  
  // Fill with placeholders if needed
  const paddedFieldPlayers = [...fieldPlayers];
  const paddedBenchPlayers = [...benchPlayers];
  
  if (paddedFieldPlayers.length < requiredFieldCount) {
    paddedFieldPlayers.push(...getPlaceholders(shortCode, requiredFieldCount - paddedFieldPlayers.length, 10000 + paddedFieldPlayers.length));
  }
  
  if (paddedBenchPlayers.length < requiredBenchCount) {
    paddedBenchPlayers.push(...getPlaceholders(shortCode, requiredBenchCount - paddedBenchPlayers.length, 20000 + paddedBenchPlayers.length));
  }
  
  // Take only required number of players
  const displayFieldPlayers = paddedFieldPlayers.slice(0, requiredFieldCount);
  const displayBenchPlayers = paddedBenchPlayers.slice(0, requiredBenchCount);
  
  return (
    <div className={`${hasBorder ? 'border-b border-gray-200 pb-3 mb-3' : 'mb-3'}`}>
      <button 
        className="w-full flex items-center justify-between font-medium p-2 cursor-pointer rounded-t-md text-white"
        style={{ backgroundColor: color }}
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-medium text-sm">{title}</h3>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {expanded && (
        <>
          <div className="bg-green-50">
            <div className="grid grid-cols-12 gap-1 items-center border-b border-gray-200 py-1 px-2 bg-green-100 text-xs font-medium text-gray-600">
              <div className="col-span-4">Player</div>
              <div className="col-span-2 text-center">Live</div>
              <div className="col-span-2 text-center">Avg</div>  
              <div className="col-span-1 text-center">BE</div>
              <div className="col-span-1 text-center">Last</div>
              <div className="col-span-2 text-right">Price</div>
            </div>
            
            {displayFieldPlayers.map((player, index) => (
              <div key={player.id} className="grid grid-cols-12 gap-1 items-center border-b border-gray-100 py-1.5 px-2 hover:bg-green-100">
                <div className="col-span-4 flex items-center gap-1 truncate">
                  {player.isCaptain && (
                    <span className="px-1 text-xs bg-yellow-500 text-white rounded-sm">C</span>
                  )}
                  <div className="truncate text-sm">
                    <div className="font-medium truncate">{player.name}</div>
                    <div className="flex items-center text-xs text-gray-600">
                      {player.team && <span>{player.team}</span>}
                      {player.team && player.secondaryPositions?.length && <span className="mx-1">•</span>}
                      {player.secondaryPositions?.length ? (
                        <span className="text-blue-600 font-medium">
                          {shortCode}/{player.secondaryPositions.join('/')}
                        </span>
                      ) : (
                        <span>{shortCode}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm font-medium">
                  {player.liveScore || '-'}
                </div>
                <div className="col-span-2 text-center text-sm font-medium">
                  {player.averagePoints?.toFixed(1) || '-'}
                </div>
                <div className="col-span-1 text-center text-sm font-medium">
                  {player.breakEven}
                </div>
                <div className="col-span-1 text-center text-sm font-medium">
                  {formatScore(player.lastScore)}
                </div>
                <div className="col-span-2 text-right text-sm font-medium">
                  {formatCurrency(player.price || 0)}
                </div>
              </div>
            ))}
          </div>
          
          {displayBenchPlayers.length > 0 && (
            <div className="bg-purple-50">
              <div className="bg-purple-200 py-1 px-2 text-sm font-medium">
                Bench
              </div>
              {displayBenchPlayers.map((player) => (
                <div key={player.id} className="grid grid-cols-12 gap-1 items-center border-b border-gray-100 py-1.5 px-2 hover:bg-purple-100">
                  <div className="col-span-4 flex items-center gap-1 truncate">
                    {player.isCaptain && (
                      <span className="px-1 text-xs bg-yellow-500 text-white rounded-sm">C</span>
                    )}
                    <div className="truncate text-sm">
                      <div className="font-medium truncate">{player.name}</div>
                      <div className="flex items-center text-xs text-gray-600">
                        {player.team && <span>{player.team}</span>}
                        {player.team && player.secondaryPositions?.length && <span className="mx-1">•</span>}
                        {player.secondaryPositions?.length ? (
                          <span className="text-blue-600 font-medium">
                            {shortCode}/{player.secondaryPositions.join('/')}
                          </span>
                        ) : (
                          <span>{shortCode}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-medium">
                    {player.liveScore || '-'}
                  </div>
                  <div className="col-span-2 text-center text-sm font-medium">
                    {player.averagePoints?.toFixed(1) || '-'}
                  </div>
                  <div className="col-span-1 text-center text-sm font-medium">
                    {player.breakEven}
                  </div>
                  <div className="col-span-1 text-center text-sm font-medium">
                    {formatScore(player.lastScore)}
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium">
                    {formatCurrency(player.price || 0)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

type TeamSummaryProps = {
  midfielders: TeamPlayer[];
  forwards: TeamPlayer[];
  defenders: TeamPlayer[];
  rucks: TeamPlayer[];
  tradesAvailable: number;
  onMakeTrade: () => void;
};

export default function TeamSummary({
  midfielders,
  forwards,
  defenders,
  rucks,
  tradesAvailable,
  onMakeTrade
}: TeamSummaryProps) {
  // Mock trade priority data
  const tradePriorityData = {
    underperforming: [
      { id: 901, name: "Jack Macrae", position: "MID", team: "WB", price: 783000, breakEven: 132, average: 88.4, lastScore: 65, projScore: 92, reason: "Underperforming relative to price" },
      { id: 902, name: "Tom Hawkins", position: "FWD", team: "GEEL", price: 654000, breakEven: 105, average: 76.7, lastScore: 62, projScore: 71, reason: "Declining output and role reduction" },
    ],
    rookiesCashedOut: [
      { id: 903, name: "Nick Watson", position: "FWD", team: "GCFC", price: 475000, breakEven: 92, average: 75.2, lastScore: 68, projScore: 72, reason: "BE has caught up to average" },
      { id: 904, name: "Harvey Gallagher", position: "MID", team: "COLL", price: 452000, breakEven: 87, average: 71.8, lastScore: 54, projScore: 65, reason: "Role reduction and diminishing returns" },
      { id: 905, name: "Darcy Wilson", position: "MID", team: "FREM", price: 431000, breakEven: 82, average: 68.5, lastScore: 58, projScore: 63, reason: "Peaked in price with declining job security" },
    ]
  };
  const [activeToolCategory, setActiveToolCategory] = useState<string>("trade");
  const [isToolsExpanded, setIsToolsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("field");
  
  // Mock coach's choice data
  const coachChoiceData = {
    mostTradedIn: [
      { id: 101, name: "Charlie Curnow", position: "FWD", team: "CARL", price: 825000, change: "+24.5k", status: "up", lastScore: 115, avgScore: 92.4 },
      { id: 102, name: "Tim English", position: "RUCK", team: "WB", price: 978000, change: "+18.2k", status: "up", lastScore: 124, avgScore: 115.6 },
      { id: 103, name: "Nick Daicos", position: "MID", team: "COLL", price: 1020000, change: "+12.8k", status: "up", lastScore: 138, avgScore: 128.2 },
      { id: 104, name: "Izak Rankine", position: "FWD", team: "ADEL", price: 745000, change: "+8.3k", status: "up", lastScore: 94, avgScore: 82.5 },
    ],
    mostTradedOut: [
      { id: 201, name: "Toby Greene", position: "FWD", team: "GWS", price: 782000, change: "-15.3k", status: "down", lastScore: 64, avgScore: 88.2 },
      { id: 202, name: "Jordan De Goey", position: "MID/FWD", team: "COLL", price: 735000, change: "-21.7k", status: "down", lastScore: 52, avgScore: 82.6 },
      { id: 203, name: "Sean Darcy", position: "RUCK", team: "FREM", price: 692000, change: "-18.9k", status: "down", lastScore: 45, avgScore: 75.1 },
      { id: 204, name: "Isaac Heeney", position: "MID/FWD", team: "SYD", price: 868000, change: "-10.2k", status: "down", lastScore: 73, avgScore: 92.3 },
    ],
    formPlayers: {
      hot: [
        { id: 301, name: "Errol Gulden", position: "MID", team: "SYD", price: 915000, trend: "Last 3: 132, 145, 128", avgScore: 128.3 },
        { id: 302, name: "Zak Butters", position: "MID", team: "PORT", price: 880000, trend: "Last 3: 126, 118, 135", avgScore: 126.3 },
        { id: 303, name: "Max Gawn", position: "RUCK", team: "MELB", price: 935000, trend: "Last 3: 124, 118, 130", avgScore: 124.0 },
      ],
      cold: [
        { id: 401, name: "Marcus Bontempelli", position: "MID", team: "WB", price: 962000, trend: "Last 3: 78, 82, 75", avgScore: 78.3 },
        { id: 402, name: "Clayton Oliver", position: "MID", team: "MELB", price: 856000, trend: "Last 3: 85, 72, 81", avgScore: 79.3 },
        { id: 403, name: "Caleb Serong", position: "MID", team: "FREM", price: 825000, trend: "Last 3: 73, 81, 79", avgScore: 77.7 },
      ]
    },
    injuries: [
      { id: 501, name: "Patrick Cripps", position: "MID", team: "CARL", status: "Test", details: "Ribs - 1 week" },
      { id: 502, name: "Lachie Neale", position: "MID", team: "BRIS", status: "Out", details: "Hamstring - 2-3 weeks" },
      { id: 503, name: "Jeremy Cameron", position: "FWD", team: "GEEL", status: "Out", details: "Concussion - 1 week" },
      { id: 504, name: "Matt Rowell", position: "MID", team: "GCFC", status: "Test", details: "Ankle - 1 week" },
      { id: 505, name: "Sam Walsh", position: "MID", team: "CARL", status: "Out", details: "Hamstring - 2 weeks" },
    ]
  };
  
  // Separate bench and field players
  const fieldMidfielders = midfielders.filter(p => !p.isOnBench);
  const benchMidfielders = midfielders.filter(p => p.isOnBench || midfielders.indexOf(p) >= 8);
  
  const fieldDefenders = defenders.filter(p => !p.isOnBench);
  const benchDefenders = defenders.filter(p => p.isOnBench || defenders.indexOf(p) >= 6);
  
  const fieldForwards = forwards.filter(p => !p.isOnBench);
  const benchForwards = forwards.filter(p => p.isOnBench || forwards.indexOf(p) >= 6);
  
  const fieldRucks = rucks.filter(p => !p.isOnBench);
  const benchRucks = rucks.filter(p => p.isOnBench || rucks.indexOf(p) >= 2);
  
  // Find utility player (if available)
  const allPlayers = [...midfielders, ...forwards, ...defenders, ...rucks];
  const utilityPlayer = allPlayers.find(p => 
    !fieldMidfielders.includes(p) && 
    !benchMidfielders.includes(p) && 
    !fieldDefenders.includes(p) && 
    !benchDefenders.includes(p) && 
    !fieldForwards.includes(p) && 
    !benchForwards.includes(p) && 
    !fieldRucks.includes(p) && 
    !benchRucks.includes(p)
  );
  
  // Calculate team stats
  const totalValue = allPlayers.reduce((sum, player) => sum + (player.price || 0), 0);
  const avgScore = allPlayers.reduce((sum, player) => sum + (player.lastScore || 0), 0) / allPlayers.length;
  
  // Mock trade history data
  const tradeHistory = [
    {
      round: 3,
      date: "May 2, 2025",
      trades: [
        {
          playerOut: {
            name: "Josh Kelly",
            position: "MID",
            team: "GWS",
            priceBefore: 810000,
            avgBefore: 98.5,
            lastScoreBefore: 78,
            priceAfter: 792000,
            avgAfter: 92.1,
            lastScoreAfter: 65,
            trend: "down"
          },
          playerIn: {
            name: "Zach Merrett",
            position: "MID",
            team: "ESS",
            priceBefore: 905000,
            avgBefore: 108.2,
            lastScoreBefore: 115,
            priceAfter: 932000,
            avgAfter: 112.5,
            lastScoreAfter: 124,
            trend: "up"
          }
        }
      ]
    },
    {
      round: 5,
      date: "May 16, 2025",
      trades: [
        {
          playerOut: {
            name: "Bailey Smith",
            position: "MID",
            team: "WB",
            priceBefore: 750000,
            avgBefore: 89.5,
            lastScoreBefore: 76,
            priceAfter: 718000,
            avgAfter: 85.2,
            lastScoreAfter: 64,
            trend: "down"
          },
          playerIn: {
            name: "Sam Walsh",
            position: "MID",
            team: "CARL",
            priceBefore: 865000,
            avgBefore: 104.8,
            lastScoreBefore: 112,
            priceAfter: 895000,
            avgAfter: 108.3,
            lastScoreAfter: 120,
            trend: "up"
          }
        },
        {
          playerOut: {
            name: "Tom Stewart",
            position: "DEF",
            team: "GEEL",
            priceBefore: 688000,
            avgBefore: 82.1,
            lastScoreBefore: 70,
            priceAfter: 665000,
            avgAfter: 79.4,
            lastScoreAfter: 67,
            trend: "down"
          },
          playerIn: {
            name: "Jordan Ridley",
            position: "DEF",
            team: "ESS",
            priceBefore: 742000,
            avgBefore: 88.5,
            lastScoreBefore: 95,
            priceAfter: 768000,
            avgAfter: 91.7,
            lastScoreAfter: 101,
            trend: "up"
          }
        }
      ]
    }
  ];
  
  // Define the tools data
  const toolsData = {
    trade: [
      { name: "Trade Optimizer", description: "Find best trades based on projections and form" },
      { name: "Trade Score Calculator", description: "Calculate points impact from potential trades" },
      { name: "One Up One Down Suggester", description: "Find optimal player pair swaps" },
      { name: "Price Difference Delta", description: "Analyze potential value changes" },
      { name: "Value Gain Tracker", description: "Track price changes and value growth" },
      { name: "Trade Burn Risk Analyzer", description: "Analyze risk of using multiple trades" },
      { name: "Trade Return Analyzer", description: "Evaluate long-term trade returns" }
    ],
    captain: [
      { name: "Captain Optimizer", description: "Find optimal captain choices for upcoming round" },
      { name: "Auto Captain Loop", description: "Auto-generate captain loop strategy" },
      { name: "Loop Validity Checker", description: "Check if your loop strategy is valid" },
      { name: "VC Success Rate Calculator", description: "Calculate optimal VC selection" },
      { name: "Captain Ceiling Estimator", description: "Identify high-ceiling captain choices" },
      { name: "Loop Strategy Risk Score", description: "Evaluate risk in your loop strategy" }
    ],
    ai: [
      { name: "AI Trade Suggester", description: "AI-powered trade recommendations" },
      { name: "AI Captain Advisor", description: "AI captain selection assistance" },
      { name: "Team Value Analyzer", description: "Team value and balance analysis" },
      { name: "Ownership Risk Monitor", description: "Track ownership % changes across your team" },
      { name: "Form vs Price Scanner", description: "Identify value opportunities" }
    ]
  };
  
  // Determine active tool interface based on category
  const renderActiveToolInterface = () => {
    const tools = toolsData[activeToolCategory as keyof typeof toolsData] || [];
    
    const toolColor = activeToolCategory === "trade" 
      ? "bg-blue-600" 
      : activeToolCategory === "captain" 
        ? "bg-green-600" 
        : "bg-purple-600";
        
    return (
      <div className="py-1">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100">
            <div className="flex-grow">
              <div className="font-medium text-sm text-center">{tool.name}</div>
              <div className="text-xs text-gray-500 text-center">{tool.description}</div>
            </div>
            <Button size="sm" className={`${toolColor} h-7 text-xs`}>Use</Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-2">
        <Card className="overflow-hidden">
          <CardContent className="p-2">
            <div className="text-xs text-center text-gray-500">Score</div>
            <div className="flex flex-col items-center">
              <div className="flex items-center mt-0.5">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mr-1"></div>
                <span className="text-xs font-medium">Live</span>
              </div>
              <div className="text-lg font-bold text-emerald-600">{Math.round(avgScore * allPlayers.length)}</div>
              
              <div className="w-full border-t border-gray-200 my-1"></div>
              
              <div className="flex items-center mt-0.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                <span className="text-xs font-medium">Proj</span>
              </div>
              <div className="text-lg font-bold text-blue-600">{Math.round(avgScore * allPlayers.length * 1.05)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardContent className="p-2">
            <div className="text-xs text-center text-gray-500">Team Value</div>
            <div className="text-xl font-bold text-center">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardContent className="p-2">
            <div className="text-xs text-center text-gray-500">Salary Left</div>
            <div className="text-xl font-bold text-center">{formatCurrency(10000000 - totalValue)}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardContent className="p-2">
            <div className="text-xs text-center text-gray-500">Trades</div>
            <div className="text-xl font-bold text-center">{tradesAvailable}</div>
          </CardContent>
        </Card>
      </div>
            
      <Card className="overflow-hidden mb-4">
        <div className="grid grid-cols-3 gap-1 bg-gray-200 p-2">
          <div 
            className={`cursor-pointer rounded flex items-center justify-between px-3 py-2
              ${activeToolCategory === "trade" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-300"}
            `}
            onClick={() => {
              if (activeToolCategory === "trade") {
                setIsToolsExpanded(!isToolsExpanded);
              } else {
                setActiveToolCategory("trade");
                setIsToolsExpanded(true);
              }
            }}
          >
            <div className="flex items-center">
              <ArrowRightLeft className="h-4 w-4 mr-2" /> 
              <span className="font-medium">Trade</span>
            </div>
            {activeToolCategory === "trade" && (
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsExpanded ? 'rotate-180' : 'rotate-0'}`} />
            )}
          </div>
          
          <div 
            className={`cursor-pointer rounded flex items-center justify-between px-3 py-2
              ${activeToolCategory === "captain" ? "bg-amber-600 text-white" : "bg-gray-100 hover:bg-gray-300"}
            `}
            onClick={() => {
              if (activeToolCategory === "captain") {
                setIsToolsExpanded(!isToolsExpanded);
              } else {
                setActiveToolCategory("captain");
                setIsToolsExpanded(true);
              }
            }}
          >
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" /> 
              <span className="font-medium">Captain</span>
            </div>
            {activeToolCategory === "captain" && (
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsExpanded ? 'rotate-180' : 'rotate-0'}`} />
            )}
          </div>
          
          <div 
            className={`cursor-pointer rounded flex items-center justify-between px-3 py-2
              ${activeToolCategory === "ai" ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-300"}
            `}
            onClick={() => {
              if (activeToolCategory === "ai") {
                setIsToolsExpanded(!isToolsExpanded);
              } else {
                setActiveToolCategory("ai");
                setIsToolsExpanded(true);
              }
            }}
          >
            <div className="flex items-center">
              <Brain className="h-4 w-4 mr-2" /> 
              <span className="font-medium">AI</span>
            </div>
            {activeToolCategory === "ai" && (
              <ChevronDown className={`h-4 w-4 transition-transform ${isToolsExpanded ? 'rotate-180' : 'rotate-0'}`} />
            )}
          </div>
        </div>
        
        {isToolsExpanded && <div className="p-4 border-t">{renderActiveToolInterface()}</div>}
      </Card>
      
      <Card className="overflow-hidden mb-4">
        <div className="grid grid-cols-3 border-b">
          <button 
            className={`py-2 font-medium text-sm ${activeTab === 'field' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('field')}
          >
            FIELD
          </button>
          <button 
            className={`py-2 font-medium text-sm ${activeTab === 'coaches' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('coaches')}
          >
            COACH
          </button>
          <button 
            className={`py-2 font-medium text-sm ${activeTab === 'history' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('history')}
          >
            HISTORY
          </button>
        </div>
        
        {activeTab === 'field' && (
          <div>
            <PositionSection
              title="Defenders"
              shortCode="D"
              fieldPlayers={fieldDefenders}
              benchPlayers={benchDefenders}
              requiredFieldCount={6}
              requiredBenchCount={2}
              color="#e53e3e"
            />
            
            <PositionSection
              title="Midfielders"
              shortCode="M"
              fieldPlayers={fieldMidfielders}
              benchPlayers={benchMidfielders}
              requiredFieldCount={8}
              requiredBenchCount={2}
              color="#3182ce"
            />
            
            <PositionSection
              title="Rucks"
              shortCode="R"
              fieldPlayers={fieldRucks}
              benchPlayers={benchRucks}
              requiredFieldCount={2}
              requiredBenchCount={1}
              color="#805ad5"
            />
            
            <PositionSection
              title="Forwards"
              shortCode="F"
              fieldPlayers={fieldForwards}
              benchPlayers={benchForwards}
              requiredFieldCount={6}
              requiredBenchCount={2}
              color="#38a169"
              hasBorder={utilityPlayer ? true : false}
            />
            
            {utilityPlayer && (
              <div className="bg-gray-100">
                <div className="bg-gray-300 py-1 px-2 text-sm font-medium">
                  Utility
                </div>
                <div className="grid grid-cols-12 gap-1 items-center border-b border-gray-200 py-1 px-2 bg-gray-200 text-xs font-medium text-gray-600">
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2 text-center">Live</div>
                  <div className="col-span-2 text-center">Avg</div>  
                  <div className="col-span-1 text-center">BE</div>
                  <div className="col-span-1 text-center">Last</div>
                  <div className="col-span-2 text-right">Price</div>
                </div>
                <div className="grid grid-cols-12 gap-1 items-center border-b border-gray-100 py-1.5 px-2 hover:bg-gray-200">
                  <div className="col-span-4 flex items-center gap-1 truncate">
                    {utilityPlayer.isCaptain && (
                      <span className="px-1 text-xs bg-yellow-500 text-white rounded-sm">C</span>
                    )}
                    <div className="truncate text-sm">
                      <div className="font-medium truncate">{utilityPlayer.name}</div>
                      <div className="flex items-center text-xs text-gray-600">
                        {utilityPlayer.team && <span>{utilityPlayer.team}</span>}
                        {utilityPlayer.team && utilityPlayer.secondaryPositions?.length && <span className="mx-1">•</span>}
                        {utilityPlayer.secondaryPositions?.length ? (
                          <span className="text-blue-600 font-medium">
                            {utilityPlayer.position}/{utilityPlayer.secondaryPositions.join('/')}
                          </span>
                        ) : (
                          <span>{utilityPlayer.position}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm font-medium">
                    {utilityPlayer.liveScore || '-'}
                  </div>
                  <div className="col-span-2 text-center text-sm font-medium">
                    {utilityPlayer.averagePoints?.toFixed(1) || '-'}
                  </div>
                  <div className="col-span-1 text-center text-sm font-medium">
                    {utilityPlayer.breakEven}
                  </div>
                  <div className="col-span-1 text-center text-sm font-medium">
                    {formatScore(utilityPlayer.lastScore)}
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium">
                    {formatCurrency(utilityPlayer.price || 0)}
                  </div>
                </div>
              </div>
            )}
            
            {/* Trade Out Priority Section */}
            <div className="mt-4 border rounded-lg overflow-hidden">
              <div className="bg-red-600 text-white p-2 font-medium">
                Trade Out Priority
              </div>
              
              <div>
                <div className="px-3 py-2 bg-gray-100 font-medium">
                  Underperforming Players
                </div>
                <div className="divide-y">
                  {tradePriorityData.underperforming.map(player => (
                    <div key={player.id} className="p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center">
                            {player.name} 
                            <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                              {player.position}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">{player.team}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{formatCurrency(player.price)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-2 text-xs">
                        <div>
                          <span className="text-gray-500">BE:</span> <span className="font-medium text-red-600">{player.breakEven}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg:</span> <span className="font-medium">{player.average}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last:</span> <span className="font-medium">{player.lastScore}</span>
                        </div>
                      </div>
                      <div className="mt-1.5 text-xs text-gray-600">
                        {player.reason}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-3 py-2 bg-gray-100 font-medium">
                  Rookies to Cash Out
                </div>
                <div className="divide-y">
                  {tradePriorityData.rookiesCashedOut.map(player => (
                    <div key={player.id} className="p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center">
                            {player.name} 
                            <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                              {player.position}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">{player.team}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{formatCurrency(player.price)}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-2 text-xs">
                        <div>
                          <span className="text-gray-500">BE:</span> <span className="font-medium text-amber-600">{player.breakEven}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg:</span> <span className="font-medium">{player.average}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last:</span> <span className="font-medium">{player.lastScore}</span>
                        </div>
                      </div>
                      <div className="mt-1.5 text-xs text-gray-600">
                        {player.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'coaches' && (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Most Traded This Week</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-green-600 text-white p-2 font-medium">
                    Most Traded In
                  </div>
                  <div className="divide-y">
                    {coachChoiceData.mostTradedIn.map(player => (
                      <div key={player.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.team} | {player.position}</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">{formatCurrency(player.price)}</div>
                            <div className="text-green-600 text-xs font-medium">{player.change} ↑</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1.5 text-xs">
                          <div className="text-gray-500">
                            Last: <span className="font-medium">{player.lastScore}</span>
                          </div>
                          <div className="text-gray-500">
                            Avg: <span className="font-medium">{player.avgScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-red-600 text-white p-2 font-medium">
                    Most Traded Out
                  </div>
                  <div className="divide-y">
                    {coachChoiceData.mostTradedOut.map(player => (
                      <div key={player.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.team} | {player.position}</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">{formatCurrency(player.price)}</div>
                            <div className="text-red-600 text-xs font-medium">{player.change} ↓</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-1.5 text-xs">
                          <div className="text-gray-500">
                            Last: <span className="font-medium">{player.lastScore}</span>
                          </div>
                          <div className="text-gray-500">
                            Avg: <span className="font-medium">{player.avgScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Form Guide</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-amber-500 text-white p-2 font-medium">
                    Running Hot 🔥
                  </div>
                  <div className="divide-y">
                    {coachChoiceData.formPlayers.hot.map(player => (
                      <div key={player.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.team} | {player.position}</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">{formatCurrency(player.price)}</div>
                            <div className="text-amber-600 text-xs font-medium">Avg: {player.avgScore} ⭐</div>
                          </div>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">
                          <span className="font-medium">{player.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-500 text-white p-2 font-medium">
                    Gone Cold ❄️
                  </div>
                  <div className="divide-y">
                    {coachChoiceData.formPlayers.cold.map(player => (
                      <div key={player.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.team} | {player.position}</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">{formatCurrency(player.price)}</div>
                            <div className="text-blue-600 text-xs font-medium">Avg: {player.avgScore} ⬇</div>
                          </div>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">
                          <span className="font-medium">{player.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-4">Injury Update</h3>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-200 text-gray-800 p-2 font-medium">
                  Latest Injury News
                </div>
                <div className="divide-y">
                  {coachChoiceData.injuries.map(player => (
                    <div key={player.id} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.team} | {player.position}</div>
                      </div>
                      <div className="text-sm">
                        <div className={`font-medium ${player.status === 'Out' ? 'text-red-600' : 'text-amber-600'}`}>
                          {player.status}
                        </div>
                        <div className="text-xs text-gray-500">
                          {player.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">Trade History</h3>
            
            {tradeHistory.length > 0 ? (
              tradeHistory.map((roundData, roundIndex) => (
                <div key={roundIndex} className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-500 text-white font-medium px-2 py-1 rounded text-sm">
                      Round {roundData.round}
                    </div>
                    <div className="ml-2 text-sm text-gray-600">{roundData.date}</div>
                  </div>
                  
                  {roundData.trades.map((trade, tradeIndex) => (
                    <div key={tradeIndex} className="border rounded-lg overflow-hidden mb-3 shadow-sm">
                      <div className="grid grid-cols-2 bg-gray-50">
                        <div className="p-3 border-r border-b">
                          <div className="flex items-center">
                            <div className="bg-red-100 rounded-full p-1.5">
                              <ArrowRightLeft className="h-4 w-4 text-red-500" />
                            </div>
                            <span className="ml-2 font-medium text-red-600">TRADED OUT</span>
                          </div>
                        </div>
                        <div className="p-3 border-b">
                          <div className="flex items-center">
                            <div className="bg-green-100 rounded-full p-1.5">
                              <ArrowRightLeft className="h-4 w-4 text-green-500" />
                            </div>
                            <span className="ml-2 font-medium text-green-600">TRADED IN</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2">
                        {/* Player Out */}
                        <div className="p-3 border-r">
                          <div className="font-semibold text-base">{trade.playerOut.name}</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {trade.playerOut.team} | {trade.playerOut.position}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                            <div>
                              <div className="text-gray-500">Price</div>
                              <div className="font-medium">{formatCurrency(trade.playerOut.priceBefore)}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Avg</div>
                              <div className="font-medium">{trade.playerOut.avgBefore}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Last</div>
                              <div className="font-medium">{trade.playerOut.lastScoreBefore}</div>
                            </div>
                          </div>
                          
                          <div className="text-sm font-medium">
                            <div className="mb-1">After Trade Performance:</div>
                            <div className="flex items-center gap-2">
                              <div className={`${trade.playerOut.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                {trade.playerOut.trend === 'up' ? (
                                  <ArrowRight className="h-3 w-3 rotate-45" />
                                ) : (
                                  <ArrowRight className="h-3 w-3 -rotate-45" />
                                )}
                                <span>${((trade.playerOut.priceAfter - trade.playerOut.priceBefore) / 1000).toFixed(1)}K</span>
                              </div>
                              <div>|</div>
                              <div>Avg: {trade.playerOut.avgAfter}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Player In */}
                        <div className="p-3">
                          <div className="font-semibold text-base">{trade.playerIn.name}</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {trade.playerIn.team} | {trade.playerIn.position}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                            <div>
                              <div className="text-gray-500">Price</div>
                              <div className="font-medium">{formatCurrency(trade.playerIn.priceBefore)}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Avg</div>
                              <div className="font-medium">{trade.playerIn.avgBefore}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Last</div>
                              <div className="font-medium">{trade.playerIn.lastScoreBefore}</div>
                            </div>
                          </div>
                          
                          <div className="text-sm font-medium">
                            <div className="mb-1">Current Performance:</div>
                            <div className="flex items-center gap-2">
                              <div className={`${trade.playerIn.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                                {trade.playerIn.trend === 'up' ? (
                                  <ArrowRight className="h-3 w-3 rotate-45" />
                                ) : (
                                  <ArrowRight className="h-3 w-3 -rotate-45" />
                                )}
                                <span>${((trade.playerIn.priceAfter - trade.playerIn.priceBefore) / 1000).toFixed(1)}K</span>
                              </div>
                              <div>|</div>
                              <div>Avg: {trade.playerIn.avgAfter}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">Net value change: </span>
                            <span className={`${trade.playerIn.priceAfter - trade.playerOut.priceAfter > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                              {formatCurrency((trade.playerIn.priceAfter - trade.playerOut.priceAfter))}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Avg score difference: </span>
                            <span className={`${trade.playerIn.avgAfter - trade.playerOut.avgAfter > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                              {(trade.playerIn.avgAfter - trade.playerOut.avgAfter).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-2">
                  <ArrowRightLeft className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No trade history</h3>
                <p className="text-gray-500">You haven't made any trades yet this season.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </>
  );
}