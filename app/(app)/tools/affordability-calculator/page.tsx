"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InformationRequest } from "@/components/lead-generation/information-request";

export default function AffordabilityCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState<{
    maxHomePrice: number;
    maxMonthlyPayment: number;
    downPaymentAmount: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12 || 0.005;
    const term = 30 * 12;

    // 28% rule: housing should not exceed 28% of gross monthly income
    const maxMonthlyPayment = (income * 0.28) - debts;
    const maxLoanAmount = (maxMonthlyPayment * (Math.pow(1 + rate, term) - 1)) / (rate * Math.pow(1 + rate, term));
    const maxHomePrice = maxLoanAmount + down;

    setResult({
      maxHomePrice,
      maxMonthlyPayment,
      downPaymentAmount: down,
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
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Affordability Calculator</h1>
            <p className="text-muted-foreground">
              Calculate how much house you can afford based on your income, debts, and down payment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Financial Information</CardTitle>
                  <CardDescription>We'll calculate what you can afford</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Gross Income ($)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        placeholder="8,000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyDebts">Monthly Debt Payments ($)</Label>
                      <Input
                        id="monthlyDebts"
                        type="number"
                        placeholder="500"
                        value={monthlyDebts}
                        onChange={(e) => setMonthlyDebts(e.target.value)}
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        Credit cards, car loans, student loans, etc.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment Available ($)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        placeholder="50,000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Expected Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        placeholder="6.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Calculate Affordability
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>You Can Afford</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Maximum Home Price</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.maxHomePrice)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Max Monthly Payment</span>
                      <span className="font-medium">{formatCurrency(result.maxMonthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-medium">{formatCurrency(result.downPaymentAmount)}</span>
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
                    Get Home Buying Guide
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

