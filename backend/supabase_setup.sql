-- Script to create the required tables for the AI Judging Backend
-- Run this in your Supabase SQL Editor

-- 1. evaluations Table
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_url TEXT,
    project_title TEXT,
    head_judge_verdict TEXT,
    final_score NUMERIC,
    summary TEXT,
    calculation_breakdown JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. ceo_findings Table
CREATE TABLE IF NOT EXISTS ceo_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    verdict TEXT,
    consensus_summary TEXT,
    fact_check_verdict TEXT,
    scores JSONB,
    total_raw NUMERIC,
    weighted_final NUMERIC,
    strengths JSONB,
    risks JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. cto_findings Table
CREATE TABLE IF NOT EXISTS cto_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    verdict TEXT,
    consensus_summary TEXT,
    conflict_resolved TEXT,
    scores JSONB,
    total_raw NUMERIC,
    weighted_final NUMERIC,
    strengths JSONB,
    vulnerabilities JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. category_scores Table
CREATE TABLE IF NOT EXISTS category_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    category_name TEXT,
    ceo_score NUMERIC,
    cto_score NUMERIC,
    ceo_weight TEXT,
    cto_weight TEXT,
    dominant_judge TEXT,
    weighted_score NUMERIC,
    max_score NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. qualitative_insights Table
CREATE TABLE IF NOT EXISTS qualitative_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    agent_type TEXT,
    point_type TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
