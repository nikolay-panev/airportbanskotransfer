<?php
// The old generic query endpoint has been retired: it built SQL from field
// names / ORDER BY values sent by the browser. Kept only for backwards
// compatibility — it now serves the same fixed, safe review list.
require __DIR__ . "/reviews.php";
