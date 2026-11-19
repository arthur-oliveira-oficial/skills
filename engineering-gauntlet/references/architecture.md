# Architecture

## Contents
- Deep modules
- Vocabulary
- Testability
- Executable boundaries
- Complexity budget
- Design it twice
- When to create an abstraction

## Deep modules

Goal: modules that hide a lot of behavior behind a small interface, placed at a clean seam and testable through that interface. They give **leverage** to callers and **locality** to maintainers.

- **Deep:** small interface, rich implementation. Good.
- **Shallow:** large interface, thin implementation that mostly passes through. Avoid.

When designing: reduce the number of methods, simplify parameters, hide more complexity inside.

**Deletion test:** if deleting the module makes complexity vanish, it was a pass-through. If complexity reappears scattered across callers, it was earning its keep.

## Vocabulary

- **Module:** anything with an interface and an implementation (function, class, package, cross-layer slice).
- **Interface:** everything a caller must know to use it correctly — types, invariants, call ordering, error modes, configuration, performance. Not just the signature.
- **Seam:** where the interface lives. Where to place it is a separate decision from what sits behind it.
- **Adapter:** a concrete implementation that fills a role at a seam.
- **One adapter = hypothetical seam; two adapters = real seam.** Don't create a seam unless something actually varies across it.

## Testability

- The interface is the test surface: tests cross the same seam callers use. Needing to test "from inside" suggests the wrong shape.
- Accept dependencies as parameters instead of creating them internally.
- Return results instead of producing side effects when possible (functional core, imperative shell).
- Small surface = simple tests.

## Executable boundaries

An architecture diagram that CI doesn't validate is decoration. Turn dependency direction, layers, module ownership, and public APIs into checks:

| Ecosystem | Tools |
|---|---|
| JS/TS | `dependency-cruiser`, `eslint-plugin-boundaries`, `eslint no-restricted-imports`, Nx module boundaries |
| Java/Kotlin | ArchUnit, Konsist |
| Python | `import-linter` |
| .NET | NetArchTest |
| Go | `depguard`, `internal/` package rules |

- Explicit dependency direction (e.g., the domain doesn't import infrastructure or the web framework).
- Violations fail automatically.
- New exceptions require a recorded rationale (short ADR).

## Complexity budget

Define repository-specific limits: function/module size, cyclomatic/cognitive complexity, coupling, nesting depth. Measure changed code and refactor when the budget regresses. Exceptions are documented and temporary.

Don't let AI satisfy tests with increasingly tangled code.

## Design it twice

For important interfaces, sketch 2–3 radically different designs and compare them on depth, locality, and seam placement before choosing. Parallel subagents work well for this.

## When to create an abstraction

- Don't create helpers/utilities/abstractions for one-time operations.
- Don't design for hypothetical future requirements; the right complexity is the minimum for the current task.
- Prefer extending existing repository patterns over inventing new architecture. When proposing a new abstraction, explain why existing ones are insufficient.
- Rule of three: duplication becomes an abstraction when the third real case appears and the variation is clear.
