const Configuration = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "footer-leading-blank": [0],
        "type-enum": [
            1,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
                "wip"
            ]
        ]
    }
};

module.exports = Configuration;
