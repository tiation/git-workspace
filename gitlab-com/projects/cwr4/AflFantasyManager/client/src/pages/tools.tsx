import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Brain, 
  Award, 
  ArrowRightLeft, 
  ShieldAlert,
  Move, 
  Calculator,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Tools() {
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    trade: true, // Trade tools expanded by default
    captaincy: false,
    tagRisk: false,
    fixtureMatching: false,
    positional: false,
    aiStrategy: false
  });

  // Define tool categories
  const categories = [
    { id: "trade", name: "Trade Tools", icon: <ArrowRightLeft className="mr-3 h-5 w-5" />, color: "bg-blue-600 hover:bg-blue-700 text-white" },
    { id: "captaincy", name: "Captaincy Tools", icon: <Award className="mr-3 h-5 w-5" />, color: "bg-amber-600 hover:bg-amber-700 text-white" },
    { id: "tagRisk", name: "Tag & Risk Tools", icon: <ShieldAlert className="mr-3 h-5 w-5" />, color: "bg-red-600 hover:bg-red-700 text-white" },
    { id: "fixtureMatching", name: "Fixture & Matchup Tools", icon: <Calculator className="mr-3 h-5 w-5" />, color: "bg-green-600 hover:bg-green-700 text-white" },
    { id: "positional", name: "Role & Positional Tools", icon: <Move className="mr-3 h-5 w-5" />, color: "bg-indigo-600 hover:bg-indigo-700 text-white" },
    { id: "aiStrategy", name: "AI Strategy Tools", icon: <Brain className="mr-3 h-5 w-5" />, color: "bg-purple-600 hover:bg-purple-700 text-white" }
  ];

  // Define the tools data based on the spreadsheet
  const toolsData = {
    trade: [
      { id: "one_up_one_down_suggester", name: "One Up One Down Suggester", description: "Find optimal player pair swaps based on price and projected scoring" },
      { id: "price_difference_delta", name: "Price Difference Delta", description: "Analyze and track potential value changes between player prices" },
      { id: "value_gain_tracker", name: "Value Gain Tracker", description: "Track price changes and value growth" },
      { id: "trade_burn_risk_analyzer", name: "Trade Burn Risk Analyzer", description: "Analyze risk of using multiple trades" },
      { id: "trade_return_analyzer", name: "Trade Return Analyzer", description: "Evaluate long-term trade returns" }
    ],
    captaincy: [
      { id: "captain_optimizer", name: "Captain Optimizer", description: "Calculate optimal captain choices based on form, matchup and ceiling" },
      { id: "auto_captain_loop", name: "Auto Captain Loop", description: "Auto-generate captain loop strategy" },
      { id: "loop_validity_checker", name: "Loop Validity Checker", description: "Check if your loop strategy is valid" },
      { id: "vc_success_rate_calculator", name: "VC Success Rate Calculator", description: "Calculate optimal VC selection" },
      { id: "captain_ceiling_estimator", name: "Captain Ceiling Estimator", description: "Identify high-ceiling captain choices" },
      { id: "loop_strategy_risk_score", name: "Loop Strategy Risk Score", description: "Evaluate risk in your loop strategy" }
    ],
    tagRisk: [
      { id: "tag_watch_monitor", name: "Tag Watch Monitor", description: "Monitor players at risk of being tagged by opponents" },
      { id: "tag_history_impact_tracker", name: "Tag History Impact Tracker", description: "Track impact of player tag history" },
      { id: "tag_target_priority_rater", name: "Tag Target Priority Rater", description: "Rate tag targeting priority" },
      { id: "tag_breaker_score_estimator", name: "Tag Breaker Score Estimator", description: "Estimate score impact of tag breaking" },
      { id: "injury_risk_model", name: "Injury Risk Model", description: "Model injury risks for players" },
      { id: "volatility_index_calculator", name: "Volatility Index Calculator", description: "Calculate player score volatility" },
      { id: "consistency_score_generator", name: "Consistency Score Generator", description: "Generate player consistency scores" },
      { id: "scoring_range_predictor", name: "Scoring Range Predictor", description: "Predict player scoring ranges" },
      { id: "late_out_risk_estimator", name: "Late Out Risk Estimator", description: "Estimate risk of player late outs" }
    ],
    fixtureMatching: [
      { id: "matchup_score_forecaster", name: "Matchup Score Forecaster", description: "Predict scores in upcoming matchups based on historical data" },
      { id: "fixture_swing_radar", name: "Fixture Swing Radar", description: "Analyze fixture swings" },
      { id: "bye_round_threat_tracker", name: "Bye Round Threat Tracker", description: "Track bye round threats" },
      { id: "opponent_form_model", name: "Opponent Form Model", description: "Model opponent team form" }
    ],
    positional: [
      { id: "role_change_detector", name: "Role Change Detector", description: "Monitor and detect when players change roles within their team" },
      { id: "cba_trend_analyzer", name: "CBA Trend Analyzer", description: "Analyze center bounce attendance trends" },
      { id: "positional_impact_scoring", name: "Positional Impact Scoring", description: "Score positional impact" },
      { id: "possession_type_profiler", name: "Possession Type Profiler", description: "Profile player possession types" }
    ],
    aiStrategy: [
      { id: "ai_trade_suggester", name: "AI Trade Suggester", description: "Get AI-powered trade recommendations based on your team needs" },
      { id: "ai_captain_advisor", name: "AI Captain Advisor", description: "AI captain selection assistance" },
      { id: "team_value_analyzer", name: "Team Value Analyzer", description: "Team value and balance analysis" },
      { id: "ownership_risk_monitor", name: "Ownership Risk Monitor", description: "Track ownership % changes across your team" },
      { id: "form_vs_price_scanner", name: "Form vs Price Scanner", description: "Identify value opportunities" }
    ]
  };

  // Toggle a category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AFL Fantasy Tools</h1>
        <p className="text-gray-600 mt-1">Enhance your team management with our specialized tools for fantasy football.</p>
      </div>
      
      <div className="space-y-4">
        {categories.map(category => {
          const isExpanded = expandedCategories[category.id];
          const toolsList = toolsData[category.id as keyof typeof toolsData];
          
          return (
            <div key={category.id} className="border rounded-lg overflow-hidden">
              {/* Category Header - Clickable */}
              <div 
                className={`flex items-center justify-between p-4 cursor-pointer ${isExpanded ? category.color : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center">
                  {category.icon}
                  <h2 className={`font-semibold text-lg ${isExpanded ? 'text-white' : ''}`}>{category.name}</h2>
                </div>
                {isExpanded ? 
                  <ChevronUp className={`h-5 w-5 ${isExpanded ? 'text-white' : ''}`} /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </div>
              
              {/* Expanded content */}
              {isExpanded && (
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    {toolsList.map(tool => (
                      <Card key={tool.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{tool.name}</h3>
                              <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
                            </div>
                            <Button 
                              className={category.color.split(' ')[0]} 
                              size="sm"
                            >
                              Use
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}