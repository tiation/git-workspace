# Project Templates Documentation

This document provides detailed information about the project templates included in the portable Git environment.

## Overview

Project templates provide a quick way to start new development projects with pre-configured boilerplate code, standard files, and best practices already set up. The portable Git environment comes with templates for several popular languages and project types.

## Available Templates

| Template | Description | Use Case |
|----------|-------------|----------|
| `node-js` | Node.js application | JavaScript/Node.js backend applications |
| `python` | Python package | Python libraries, applications, and utilities |
| `web-basic` | Basic HTML/CSS/JS website | Simple web projects with vanilla HTML, CSS, and JavaScript |
| `golang` | Go application | Go-based applications and services |

## Using Templates

You can use templates through the `dev-tools.sh` script:

```bash
dev-tools.sh create-project <template> <project-name> [dest-dir]
```

For example:
```bash
dev-tools.sh create-project node-js my-app ./repos/github
```

## Template Details

### Node.js Template

The Node.js template includes:

- Basic `package.json` with common metadata and scripts
- Entry point (`index.js`)
- Git configuration (`.gitignore`)
- README file

Example project structure:
```
my-node-project/
├── .gitignore
├── index.js
├── package.json
└── README.md
```

To start developing with this template:
```bash
dev-tools.sh create-project node-js my-app
cd my-app
npm install
npm start
```

### Python Template

The Python template includes:

- `setup.py` for package configuration
- Package directory with `__init__.py`
- Git configuration (`.gitignore`)
- README file

Example project structure:
```
my-python-project/
├── .gitignore
├── setup.py
├── project_name/
│   └── __init__.py
└── README.md
```

To start developing with this template:
```bash
dev-tools.sh create-project python my-app
cd my-app
python -m venv venv
source venv/bin/activate
pip install -e .
```

### Web Basic Template

The web basic template includes:

- HTML file with basic structure
- CSS file with basic styles
- JavaScript file with DOM ready handler
- Git configuration (`.gitignore`)
- README file

Example project structure:
```
my-web-project/
├── .gitignore
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

To start developing with this template:
```bash
dev-tools.sh create-project web-basic my-site
cd my-site
# Open index.html in your browser
```

### Go Template

The Go template includes:

- `main.go` with basic "Hello World" functionality
- `go.mod` for dependency management
- Git configuration (`.gitignore`)
- README file

Example project structure:
```
my-go-project/
├── .gitignore
├── go.mod
├── main.go
└── README.md
```

To start developing with this template:
```bash
dev-tools.sh create-project golang my-app
cd my-app
go mod tidy
go run main.go
```

## Customizing Templates

### Modifying Existing Templates

You can modify the templates to match your preferences:

1. Templates are stored in `templates/project-templates/<template-name>/`
2. Edit any file within the template directory
3. Future projects created from the template will include your modifications

### Creating New Templates

To create a new template:

1. Create a new directory in `templates/project-templates/`
2. Add all files needed for your template
3. Use placeholders like `project-name` that will be replaced when creating a project
4. Your new template will be available for use with `create-project`

Example of creating a custom template:
```bash
mkdir -p templates/project-templates/my-custom-template
# Add template files
touch templates/project-templates/my-custom-template/custom-file.txt
```

## Template Variables

When creating a project from a template, the following variables are automatically replaced:

| Variable | Description | Example |
|----------|-------------|---------|
| `project-name` | The project name provided | `my-awesome-app` |
| `project_name` | The project name with dashes replaced by underscores | `my_awesome_app` |
| `GIT_USERNAME` | The configured Git username | `raf astor` |
| `GIT_EMAIL` | The configured Git email | `t115th3on31k@gmail.com` |

## Troubleshooting

### Template Not Found

If you get a "Template not found" error:

1. Ensure the template exists in `templates/project-templates/`
2. Check for typos in the template name
3. Run `dev-tools.sh list-templates` to see available templates
4. If needed, run `dev-tools.sh init-templates` to reinitialize templates

### Project Creation Issues

If project creation fails:

1. Ensure the destination directory is writable
2. Check that any existing directory with the same name doesn't already exist
3. Verify that Git is correctly installed and configured

### Missing Dependencies

If dependencies are missing for a created project:

1. For Node.js projects, run `npm install`
2. For Python projects, run `pip install -e .`
3. For Go projects, run `go mod tidy`

