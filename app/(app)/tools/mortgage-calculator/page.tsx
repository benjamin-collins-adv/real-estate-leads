"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InformationRequest } from "@/components/lead-generation/information-request";

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    principal: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    const principal = price - down;
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
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
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Mortgage Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your monthly mortgage payment and see how much you'll pay over the life of your loan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Details</CardTitle>
                  <CardDescription>Fill in the information below to calculate your mortgage</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="homePrice">Home Price ($)</Label>
                      <Input
                        id="homePrice"
                        type="number"
                        placeholder="500,000"
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
                        placeholder="100,000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        required
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        {homePrice && downPayment
                          ? `Down payment: ${((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)}%`
                          : "Typically 20% of home price"}
                      </p>
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
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <select
                        id="loanTerm"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                      >
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="30">30 years</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Mortgage
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                      <p className="text-2xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Principal Amount</span>
                        <span className="font-medium">{formatCurrency(result.principal)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-medium">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t font-semibold">
                        <span>Total Payment</span>
                        <span>{formatCurrency(result.totalPayment)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <InformationRequest
                resourceType="buying-guide"
                trigger={
                  <Button variant="outline" className="w-full">
                    Get Home Buying Guide
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

