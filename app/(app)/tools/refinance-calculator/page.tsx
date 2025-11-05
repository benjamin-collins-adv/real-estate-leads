"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Percent, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InformationRequest } from "@/components/lead-generation/information-request";

export default function RefinanceCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [remainingTerm, setRemainingTerm] = useState("");
  const [closingCosts, setClosingCosts] = useState("");
  const [result, setResult] = useState<{
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    breakEvenMonths: number;
    totalSavings: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const balance = parseFloat(currentBalance);
    const currentR = parseFloat(currentRate) / 100 / 12;
    const newR = parseFloat(newRate) / 100 / 12;
    const term = parseInt(remainingTerm);
    const costs = parseFloat(closingCosts) || 0;

    const currentPayment = (balance * currentR * Math.pow(1 + currentR, term * 12)) / (Math.pow(1 + currentR, term * 12) - 1);
    const newPayment = (balance * newR * Math.pow(1 + newR, 30 * 12)) / (Math.pow(1 + newR, 30 * 12) - 1);
    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = costs / monthlySavings;
    const totalSavings = monthlySavings * (term * 12) - costs;

    setResult({
      currentPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths,
      totalSavings,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
              <Percent className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Refinance Calculator</h1>
            <p className="text-muted-foreground">
              Determine if refinancing makes sense and calculate potential savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Mortgage Details</CardTitle>
                  <CardDescription>Enter your current mortgage information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentBalance">Current Loan Balance ($)</Label>
                      <Input
                        id="currentBalance"
                        type="number"
                        placeholder="300,000"
                        value={currentBalance}
                        onChange={(e) => setCurrentBalance(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                        <Input
                          id="currentRate"
                          type="number"
                          placeholder="7.5"
                          value={currentRate}
                          onChange={(e) => setCurrentRate(e.target.value)}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newRate">New Interest Rate (%)</Label>
                        <Input
                          id="newRate"
                          type="number"
                          placeholder="6.0"
                          value={newRate}
                          onChange={(e) => setNewRate(e.target.value)}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="remainingTerm">Years Remaining</Label>
                        <Input
                          id="remainingTerm"
                          type="number"
                          placeholder="25"
                          value={remainingTerm}
                          onChange={(e) => setRemainingTerm(e.target.value)}
                          required
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                        <Input
                          id="closingCosts"
                          type="number"
                          placeholder="5,000"
                          value={closingCosts}
                          onChange={(e) => setClosingCosts(e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Calculate Refinance Savings
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Refinance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(result.monthlySavings)}
                    </p>
                  </div>
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Payment</span>
                      <span className="font-medium">{formatCurrency(result.currentPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">New Payment</span>
                      <span className="font-medium">{formatCurrency(result.newPayment)}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Break-even Period</span>
                        <span className="font-medium">
                          {Math.ceil(result.breakEvenMonths)} months
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Total Savings</span>
                        <span className="text-green-600">{formatCurrency(result.totalSavings)}</span>
                      </div>
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
                    Get Mortgage Guide
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

