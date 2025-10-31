"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InformationRequest } from "@/components/lead-generation/information-request";

export default function ClosingCostCalculatorPage() {
  const [homePrice, setHomePrice] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [result, setResult] = useState<{
    originationFee: number;
    appraisal: number;
    inspection: number;
    titleInsurance: number;
    recordingFee: number;
    prepaidInsurance: number;
    prepaidTaxes: number;
    total: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(homePrice);
    const loan = parseFloat(loanAmount);

    const originationFee = loan * 0.01; // 1% of loan
    const appraisal = 400;
    const inspection = 500;
    const titleInsurance = price * 0.005; // 0.5% of home price
    const recordingFee = 200;
    const prepaidInsurance = (price * 0.0035) / 12 * 6; // 6 months of insurance
    const prepaidTaxes = (price * 0.012) / 12 * 6; // 6 months of taxes
    const total = originationFee + appraisal + inspection + titleInsurance + recordingFee + prepaidInsurance + prepaidTaxes;

    setResult({
      originationFee,
      appraisal,
      inspection,
      titleInsurance,
      recordingFee,
      prepaidInsurance,
      prepaidTaxes,
      total,
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
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Closing Cost Calculator</h1>
            <p className="text-muted-foreground">
              Estimate all closing costs including fees, taxes, and insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Property Details</CardTitle>
                  <CardDescription>We'll estimate your closing costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculate} className="space-y-6">
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
                      <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        placeholder="320,000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        Purchase price minus down payment
                      </p>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Calculate Closing Costs
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Estimated Costs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Closing Costs</p>
                    <p className="text-3xl font-bold">{formatCurrency(result.total)}</p>
                  </div>
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Origination Fee</span>
                      <span className="font-medium">{formatCurrency(result.originationFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Appraisal</span>
                      <span className="font-medium">{formatCurrency(result.appraisal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inspection</span>
                      <span className="font-medium">{formatCurrency(result.inspection)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title Insurance</span>
                      <span className="font-medium">{formatCurrency(result.titleInsurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recording Fee</span>
                      <span className="font-medium">{formatCurrency(result.recordingFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prepaid Insurance</span>
                      <span className="font-medium">{formatCurrency(result.prepaidInsurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prepaid Taxes</span>
                      <span className="font-medium">{formatCurrency(result.prepaidTaxes)}</span>
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

