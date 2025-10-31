"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InformationRequest } from "@/components/lead-generation/information-request";

export default function RentVsBuyPage() {
  const [monthlyRent, setMonthlyRent] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState<{
    monthlyMortgage: number;
    annualRentCost: number;
    annualOwnershipCost: number;
    breakEvenYears: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const rent = parseFloat(monthlyRent);
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = 30 * 12;

    const principal = price - down;
    const monthlyMortgage = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const annualOwnershipCost = monthlyMortgage * 12 + (price * 0.01); // 1% for taxes/maintenance
    const annualRentCost = rent * 12;
    const breakEvenYears = down / ((annualRentCost - annualOwnershipCost) / 12);

    setResult({
      monthlyMortgage,
      annualRentCost,
      annualOwnershipCost,
      breakEvenYears: Math.abs(breakEvenYears),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Rent vs Buy Calculator</h1>
            <p className="text-muted-foreground">
              Compare the costs of renting versus buying to make the best financial decision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Information</CardTitle>
                  <CardDescription>Compare renting vs buying costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                      <Input
                        id="monthlyRent"
                        type="number"
                        placeholder="2,000"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homePrice">Home Purchase Price ($)</Label>
                      <Input
                        id="homePrice"
                        type="number"
                        placeholder="400,000"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment ($)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        placeholder="80,000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        placeholder="6.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Compare Options
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monthly Mortgage</p>
                    <p className="text-2xl font-bold">{formatCurrency(result.monthlyMortgage)}</p>
                  </div>
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Annual Rent Cost</span>
                      <span className="font-medium">{formatCurrency(result.annualRentCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Annual Ownership Cost</span>
                      <span className="font-medium">{formatCurrency(result.annualOwnershipCost)}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Break-even Point</p>
                      <p className="text-lg font-semibold">
                        {result.breakEvenYears.toFixed(1)} years
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!result && (
              <InformationRequest
                resourceType="buying-guide"
                trigger={
                  <Button variant="outline" className="w-full">
                    Get Buying Guide
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

