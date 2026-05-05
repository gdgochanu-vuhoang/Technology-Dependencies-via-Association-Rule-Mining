# Big Data Market Basket Analysis

A comprehensive analysis of developer technology stacks and professional roles using market basket analysis techniques on Stack Overflow survey data (2020-2024).

## Project Overview

This project combines data science research with interactive visualization to uncover technology association patterns across different developer roles. Using market basket analysis on Stack Overflow's annual surveys, we identify which technologies frequently co-occur in professional developer environments.

### Key Components

1. **Research Notebook** (`ResearchNotebook.ipynb`)
   - Data loading and preprocessing from multi-year survey datasets
   - Market basket analysis and association rule mining
   - Role-based technology pattern extraction
   - Visualization of technology trends and relationships

2. **Web Application** (`web/`)
   - Interactive Nuxt 3 dashboard
   - Real-time visualization of technology associations
   - Role-specific filtering and exploration
   - Built with Vue 3, Tailwind CSS, and Nuxt UI

3. **Datasets** (`datasets/`)
   - Stack Overflow survey data (2020-2024)
   - Raw CSV files containing developer responses
   - Multi-year trend analysis capabilities

4. **Extracted Rules** (`extracted/`)
   - Pre-computed association rules for 35+ developer roles
   - CSV format for efficient querying and visualization
   - Includes metrics: support, confidence, lift

## Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+ (for web development)
- npm/pnpm/yarn

### Python Environment Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\Activate.ps1

# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Python Dependencies

- `pandas` - Data manipulation and analysis
- `matplotlib` - Static visualizations
- `seaborn` - Statistical graphics
- `mlxtend` - Market basket analysis algorithms
- `jupyter` - Interactive notebook environment
- `ipykernel` - Jupyter kernel for Python

### Web Application Setup

```bash
cd web

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

### Running the Research Notebook

```bash
# Start Jupyter
jupyter notebook

# Open ResearchNotebook.ipynb and run cells sequentially
```

**Notebook Workflow:**
1. Load and preprocess survey data
2. Perform sparsity and frequency analysis
3. Generate association rules per developer role
4. Export results to `extracted/` & `web/public/roles_rules` folder

### Running the Web Application

```bash
cd web

# Development (http://localhost:3000)
npm run dev

# Production preview
npm run build
npm run preview
```

## Data Pipeline

```
datasets/ (Raw Survey Data)
    ↓
ResearchNotebook.ipynb (Processing & Analysis)
    ↓
extracted/ (Association Rules per Role)
    ↓
web/public/roles_rules/ (JSON for Frontend)
    ↓
Vue Components (Interactive Visualization)
```

## Key Files

### Research Notebook
- `ResearchNotebook.ipynb` - Main analysis notebook

### Web Application
- `web/nuxt.config.ts` - Nuxt configuration
- `web/app/pages/index.vue` - Main dashboard
- `web/app/components/` - Reusable Vue components
- `web/app/composables/useData.ts` - Data handling logic
- `web/app/utils/formatter.ts` - Utility functions

### Data
- `requirements.txt` - Python dependencies
- `datasets/` - Raw survey CSV files (2020-2024)
- `extracted/` - Role-specific association rules
- `web/public/roles_rules/` - JSON rules for web display

## Supported Developer Roles

The analysis covers 35+ professional roles including:

- Backend Developer
- Frontend Developer
- Full Stack Developer
- Data Scientist / Machine Learning Specialist
- DevOps Specialist
- Database Administrator
- Security Professional
- Cloud Infrastructure Engineer
- Mobile Developer
- Game Developer
- Embedded Systems Developer
- And many more...

## Analysis Metrics

Each role's association rules include:

- **Support** - Frequency of technology pair in the dataset
- **Confidence** - Probability of tech B when tech A is present
- **Lift** - How much more likely techs co-occur vs. random chance
- **Count** - Number of developer instances with both technologies

## Architecture Decisions

### Frontend
- **Nuxt 3** - SSR capabilities with modern DX
- **Vue 3 Composition API** - Reactive data handling
- **Tailwind CSS** - Utility-first styling
- **Nuxt UI** - Pre-built accessible components

### Data Processing
- **Pandas** - Efficient multi-year data concatenation
- **MLxtend** - Mature market basket analysis library
- **CSV Format** - Portable, version-control friendly

## Development Workflow

```bash
# Start the dev server in one terminal
cd web
npm run dev

# Run the notebook in another terminal
jupyter notebook

# Make changes and test iteratively
```

## Building for Production

```bash
# Build web application
cd web
npm run build

# Deploy the `dist/` directory to your hosting service
```

## Performance Tips

### For Notebook Execution
- Start with a subset of years to test pipeline
- Use `nrows` parameter in `pd.read_csv()` for quick testing
- Monitor memory usage with large datasets

### For Web Development
- Use dev server for hot module reloading
- Check Lighthouse scores for performance metrics
- Profile component rendering with Vue DevTools

## Troubleshooting

### Python Environment Issues
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Web App Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules .nuxt
npm install
npm run dev
```

### Missing Data Files
- Ensure all CSV files are in `datasets/` folder
- Verify column names match the rename map in notebook
- Check file permissions

---

**Last Updated:** May 2026
**Survey Data Range:** 2020-2024
**Analysis Method:** Market Basket Analysis (Apriori Algorithm)
