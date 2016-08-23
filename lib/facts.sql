DROP TABLE facts IF EXISTS;

CREATE TABLE facts (
  id VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  source VARCHAR(255) NOT NULL DEFAULT 'unknown',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);
