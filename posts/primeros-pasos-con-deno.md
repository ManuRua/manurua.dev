---
name: Primeros pasos con Deno 🦕 El sucesor de NodeJS desarrollado con Rust y TypeScript
thumbnail: /images/deno/deno_cover.jpeg
date: 2020-05-17
time: 5
tags: ["Deno", "NodeJS", "TypeScript", "Rust", "Intro"]
metatags: ["deno", "nodejs", "typescript", "rust", "intro"]
---

<h1>Tabla de Contenidos</h1>

[[toc]]

# **🤔 ¿Qué es Deno?**

**[Deno](https://deno.land/)** es el nuevo runtime multiplataforma para JavaScript y TypeScript desarrollado por Ryan Dahl, el creador de **NodeJS**. Basado en la V8 de Chrome, desarrollado en Rust y basado en TypeScript, llega para desterrar a éste de su reinado.

Si bien sigue la misma arquitectura que NodeJS, es decir, event driven, asincronía, etc, es un proyecto totalmente nuevo. NodeJS fue escrito en C++, pero Deno está escrito en **[Rust](https://www.rust-lang.org/)** y hace uso de librerías como **[Tokio](https://github.com/tokio-rs/tokio)**, utilizada para el **[Event Loop](https://nodejs.org/uk/docs/guides/event-loop-timers-and-nexttick/)** de Deno. Entre sus características principales:

- **Seguro** por defecto, sin acceso a archivos, red o entorno de trabajo, a menos que esto este habilitado.
- Soporte para **TypeScript**.
- Se despliega un **solo** ejecutable.
- Cuenta con **utilidades** integradas como un inspector de dependencias `deno info`, un formateador de código `deno fmt`, suite de testing y linter.
- Tiene un conjunto de **[módulos estándar](https://deno.land/std)** previamente auditados los cuales están garantizados para trabajar con Deno.

> Los elementos que componen Deno nos dejan ver, a priori, seguridad y rendimiento como principal motivación.
> 

# **🔌 Instalación**

Podemos instalar Deno de forma muy sencilla mediante [cargo](https://doc.rust-lang.org/cargo/), [homebrew](https://formulae.brew.sh/formula/deno) o [scoop](https://scoop.sh/) pero vamos a usar curl en este ejemplo:

```
$ curl -fsSL https://deno.land/x/install/install.sh | sh
```

Podemos comprobar nuestra instalación ejecutando el script de bienvenida:

```
$ deno run https://deno.land/std/examples/welcome.ts
```

👋🏻 Si todo está bien, nos debe devolver un amigable saludo por consola.Vamos a probar más ejemplos a medida que vemos todas sus virtudes.

# **⚔️ Deno vs NodeJS**

Al echar la vista atrás, en cualquier proyecto que uno empezó hace mucho tiempo, piensas en las cosas que cambiarías si lo construyeras de nuevo y qué otras cosas no volverías a hacer. Lo mismo le ha pasado a **Ryan Dahl**, el cual ya en la **JSConf2018** dio una presentación con “10 things I regret about NodeJS”.

[https://www.youtube.com/watch?v=M3BM9TB-8yA](https://www.youtube.com/watch?v=M3BM9TB-8yA)

Entre las más famosas, está el conocido [callback hell](http://callbackhell.com/) que sigue siendo de base el mayor inconveniente para muchas librerías que aún continuan usando callbacks aún teniendo los [módulos](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import) de ECMAScript y las [promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise).

> Todas las acciones asíncronas de Deno devuelven una promesa.
> 

Es por ello por lo que ha pasado el último año y medio en el desarrollo de este nuevo y prometedor proyecto. Veamos en qué se diferencian.

## **🛡 Seguridad**

Deno tiene el foco puesto en este apartado con el objetivo de evitar situaciones similares a la del **[malware](https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry)** con permisos de escritura que se subió a NPM. Para ello, a diferencia de NodeJS, los programas de Deno se ejecutan en su propio **Sandbox**. Quiere decir que por defecto no tendremos acceso, por ejemplo, al **sistema de ficheros**, **red** y **variables de entorno**, a menos que se especifique explícitamente.

El siguiente ejemplo intenta acceder al file system para crear el fichero test.txt:

![https://miro.medium.com/max/700/1*JEWmrqe5MGsvsCTPmhs5-Q.png](https://miro.medium.com/max/700/1*JEWmrqe5MGsvsCTPmhs5-Q.png)

Probamos a ejecutar el script: `$ deno run fsPermissionDenied.ts` y recibimos el siguiente error:

> error: Uncaught PermissionDenied: write access to “test.txt”, run again with the — allow-write flag
> 

Como vemos Deno ya nos indica mediante flags el modo para tener acceso a estos recursos:

- `--allow-read` para lectura.
- `--allow-write` para lectura.
- `--allow-network` para tener acceso a la red.
- `--allow-env` para el entorno.
- `--allow-run` para el lanzamiento de subprocesos.

## **🧱 Módulos**

NPM es un repositorio centralizado y propiedad de una empresa [privada](http://joyent.com/) y aunque se han introducido muchas mejoras con los años, la carpeta node_modules sigue siendo un agujero negro.

Deno utiliza el sistema de módulos de ECMAScript y, como los navegadores, carga los módulos por **URL**.Mediante el uso de URL, los paquetes de Deno se pueden distribuir sin usar un registro central como NPM. De esta forma, tenemos un sistema completamente **descentralizado** y cualquier desarrollador puede alojar su módulo donde quiera. Adios a `package.json`, `node_modules` y las sentencias `require`.

Al iniciar la aplicación, Deno carga todos los módulos importados y los almacena en **caché**. Una vez que se almacenan en caché, Deno no los volverá a cargar a menos que le pasemos el flag `--reload`.

Es muy interesante el hecho de que si nos resulta tedioso especificar constantemente las URLs de los módulos a importar, Deno nos ofrece la posibilidad de gestionar de forma más cortas estas importaciones mediante la *reexportación* desde otro **archivo local** o la creación de un **mapa de importación** en formato JSON, solución similiar al Webpack alias o TypeScript path alias.

![https://miro.medium.com/max/700/1*mssKmeoreTtpFBCTi07SpQ.png](https://miro.medium.com/max/700/1*mssKmeoreTtpFBCTi07SpQ.png)

Al usar `import { serve } from "http/server.ts";` en cualquier fichero, Deno resuelve la importación (siempre que pasemos el flag `--importmap`) del paquete.

Sin embargo, Deno dispone de un namespace u objeto global que nos da acceso a una gran variedad de módulos y no tendremos la necesidad de importarlos.

## **🤝 Compatibilidad del navegador**

La plataforma Deno se esfuerza por la compatibilidad de su código con los **navegadores**. Tal cual exponen en su manual:

> El subconjunto de programas Deno que estén escritos completamente en Javascript pero que no utilicen el espacio global de Deno, deberán poder ejecutarse en un navegador web moderno sin cambios.
> 

Usando módulos ES, no estamos obligados a usar algunas herramientas de ensamblaje, como Webpack.

## **🧬 TypeScript nativo**

Deno simplifica el uso de **TypeScript**, eliminando la necesidad de que los desarrolladores configuren cualquier cosa para ejecutarlo.A su vez, los programas Deno también se pueden escribir en JavaScript sin problemas.Esto viene a confirmar, una vez más que TypeScript se ha convertido en un standard de facto en el mundo JS.

## **🧰 Librería estándar y herramientas**

Deno dispone de una **[librería standard](https://deno.land/std/)** que no solo nos va a permitir interactuar con el filesystem como hemos visto si no que también ofrece un total soporte para el [networking](https://deno.land/std/http/) y un completo [suite de testing](https://deno.land/std/testing):

![https://miro.medium.com/max/700/1*jEhiptTM1rr8iAk41QHcgg.png](https://miro.medium.com/max/700/1*jEhiptTM1rr8iAk41QHcgg.png)

Ejecutando `$ deno test test.ts` tenemos directamente nuestros tests corriendo.

# **🎉 Conclusiones**

Aunque su logo sea un **dinosaurio**, Deno no tiene nada de prehistórico y su propuesta es realmente novedosa. Si bien es pronto para estimar si le ganará terreno a NodeJS, parece claro que Deno viene a mejorar los puntos débiles de éste.La pinta es **espectacular** y tiene muchos ingredientes como para darle una oportunidad y seguir de cerca su evolución. Podéis hacerlo en su **[repo](https://github.com/denoland/deno)** si estáis interesados.

# **🔍 Referencias**

- [https://deno.land/](https://deno.land/)
- [https://platzi.com/comunidad/deno-el-nuevo-runtime-para-javascript-y-typescript-por-ryan-dahl-el-creador-de-nodejs/](https://platzi.com/comunidad/deno-el-nuevo-runtime-para-javascript-y-typescript-por-ryan-dahl-el-creador-de-nodejs/)
- [https://pablomagaz.com/blog/deno-el-remplazo-de-nodejs](https://pablomagaz.com/blog/deno-el-remplazo-de-nodejs)
- [https://weekly-geekly-es.github.io/articles/460020/index.html](https://weekly-geekly-es.github.io/articles/460020/index.html)
- [https://medium.com/javascript-espa%C3%B1ol/hola-deno-f31f9f6f2c84](https://medium.com/javascript-espa%C3%B1ol/hola-deno-f31f9f6f2c84)

**Si te gustó, fue interesante o te resultó útil puedes apoyarme compartiendo este artículo** 🙂
Puedes encontrar el código de los ejemplos en GitHub:

[https://github.com/ManuRua/deno-intro](https://github.com/ManuRua/deno-intro)
